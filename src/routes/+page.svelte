<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Download from '$lib/icons/Download.svelte';
	import Loading from '$lib/icons/Loading.svelte';
	import Footer from '$lib/sections/Footer.svelte';
	import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

	let prompt: string = '';
	let files: FileList;
	let loading = false;
	let result: Interview;

	let audioDurationSeconds: number = 0;
	let transcriptLength: number = 0;

	const submit = async () => {
		loading = true;
		let audio;
		const reader = new FileReader();
		let mp3: File;
		console.log(files[0].type);
		const ffmpeg = createFFmpeg({ log: true });
		await ffmpeg.load();
		if (files[0].type === 'audio/x-m4a' || files[0].type === 'audio/m4a') {
			console.log('converting to mp3');
			ffmpeg.FS('writeFile', 'audio.m4a', await fetchFile(files[0]));
			await ffmpeg.run('-i', 'audio.m4a', 'audio.mpeg');
			const data = ffmpeg.FS('readFile', 'audio.mpeg');
			const mp3Blob = new Blob([data.buffer], { type: 'audio/mpeg' });
			mp3 = new File([mp3Blob], 'audio.mpeg', { type: 'audio/mpeg' });
		} else if (files[0].type === 'audio/wav' || files[0].type === 'audio/x-wav') {
			console.log('converting to mp3');
			ffmpeg.FS('writeFile', 'audio.wav', await fetchFile(files[0]));
			await ffmpeg.run('-i', 'audio.wav', 'audio.mpeg');
			const data = ffmpeg.FS('readFile', 'audio.mpeg');
			const mp3Blob = new Blob([data.buffer], { type: 'audio/mpeg' });
			mp3 = new File([mp3Blob], 'audio.mpeg', { type: 'audio/mpeg' });
		} else if (files[0].type === 'video/mp4') {
			console.log('converting to mp3');
			ffmpeg.FS('writeFile', 'video.mp4', await fetchFile(files[0]));
			await ffmpeg.run('-i', 'video.mp4', 'audio.mpeg');
			const data = ffmpeg.FS('readFile', 'audio.mpeg');
			const mp3Blob = new Blob([data.buffer], { type: 'audio/mpeg' });
			mp3 = new File([mp3Blob], 'audio.mpeg', { type: 'audio/mpeg' });
		} else {
			mp3 = files[0];
		}

		reader.readAsDataURL(mp3);
		reader.onload = async (e) => {
			audio = e.target?.result;
			const response = await fetch('/api/audio', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					prompt,
					audio
				})
			});
			result = await response.json();
			loading = false;
		};
	};

	$: if (files && files[0]) {
		const audio = new Audio(URL.createObjectURL(files[0]));
		audio.onloadedmetadata = () => {
			audioDurationSeconds = audio.duration;
		};
	}

	const download = async (text: string) => {
		const a = document.createElement('a');
		const file = new Blob([text], { type: 'text/plain' });
		a.href = URL.createObjectURL(file);
		a.download = 'download.txt';
		a.click();
	};
</script>

<main>
	<section class="container">
		<header class="pt-20 pb-10 text-center">
			<h1 class="text-4xl font-semibold text-neutral-800">Easily process interviews</h1>
			<h2 class="mt-3 text-2xl text-neutral-700">
				Automatically transcribe and summarize interviews
			</h2>
		</header>
		<form
			method="post"
			on:submit|preventDefault={submit}
			encType="multipart/form-data"
			class="mx-auto flex max-w-lg flex-col rounded-lg border bg-neutral-100 p-8">
			<label for="file" class="font-semibold">Select an audio file (mp3, m4a, wav, mp4)</label>
			<input id="file" type="file" bind:files accept=".mp3,.m4a,.wav,.mp4" class="mt-2" required />
			<label for="prompt" class="mt-6 font-semibold">What is the audio about?</label>
			<input
				id="prompt"
				type="text"
				bind:value={prompt}
				class="mt-2 rounded"
				autocomplete="off"
				placeholder="&quot;An interview between a designer and product owner&quot;" />

			{#if loading}
				<div class="mt-10 inline-flex justify-center gap-2">
					<p class="">loading...</p>
					<p class="text-neutral-800 "><Loading /></p>
				</div>
			{:else}
				<Button type="submit" styleClasses="mt-4">Process</Button>
			{/if}
			{#if audioDurationSeconds}
				<p class="mt-4">
					Estimated time to process: <span class="font-semibold">{audioDurationSeconds / 4}</span> seconds
				</p>
				<p class="mt-2 font-semibold">
					Do not reload/refresh this page when processing, progress will be lost.
				</p>
			{/if}
		</form>
	</section>
	{#if result}
		<section class="container prose mt-10">
			<header class="flex justify-between">
				<h1>Summary</h1>
				<Button styleClasses="flex h-10 items-center gap-3" onClick={() => download(result.summary)}
					>Download<Download /></Button>
			</header>
			<p class="">{result.summary}</p>
		</section>
		<section class="container prose mt-10">
			<header class="flex justify-between">
				<h1>Transcript</h1>
				<Button
					styleClasses="flex h-10 items-center gap-3"
					onClick={() => download(result.transcript)}>Download<Download /></Button>
			</header>
			<p class="">{result.transcript}</p>
		</section>
	{/if}
</main>
<Footer />
