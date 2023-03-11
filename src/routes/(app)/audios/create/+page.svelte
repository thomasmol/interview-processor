<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Copy from '$lib/icons/Copy.svelte';
	import Download from '$lib/icons/Download.svelte';
	import Loading from '$lib/icons/Loading.svelte';
	import Footer from '$lib/sections/Footer.svelte';

	let prompt: string = '';
	let files: FileList;
	let loading = false;
	let result: Interview = {
		summary: '',
		transcript: ''
	};
	let audioDurationSeconds: number = 0;
	let transcriptLength: number = 0;

	const submit = async () => {
			await submitAudio();
			await submitTranscript();

			try{
			const response = await fetch('/api/audios', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: files[0].name,
					prompt,
					summary: result.summary,
					transcript: result.transcript,
					audioDurationSeconds: 0
				})
			})
			}catch(e){
				console.log(e);
		}
	};

	const submitAudio = async () => {
		loading = true;

		const formData = new FormData();
		formData.append('prompt', JSON.stringify(prompt));
		formData.append('file', files[0]);
		const response = await fetch('/api/transcribe', {
			method: 'POST',
			body: formData
		});
		const data = await response.json();
		console.log(data);
		result.transcript = data.transcript;



		loading = false;
	};

	const submitTranscript = async () => {
		loading = true;

		const formData = new FormData();
		formData.append('prompt', JSON.stringify(prompt));
		formData.append('transcript', result.transcript);
		const response = await fetch('/api/summarize', {
			method: 'POST',
			body: formData
		});
		const data = await response.json();
		console.log(data);
		result.summary = data.summary;
		loading = false;
	}

	$: if (files && files[0]) {
		const audio = new Audio(URL.createObjectURL(files[0]));
		audio.onloadedmetadata = () => {
			audioDurationSeconds = audio.duration;
		};
	}

	const download = async (text: string, type: string) => {
		const a = document.createElement('a');
		const file = new Blob([text], { type: 'text/plain' });
		a.href = URL.createObjectURL(file);
		a.download = type + '.txt';
		a.click();
	};

	const copyToClipboard = async (text: string) => {
		await navigator.clipboard.writeText(text);
	};
</script>
<main class="h-full">
	<section class="container">
    <header class="mt-10 mb-4">
      <h1 class="text-center text-xl font-semibold">Start processing a new interview</h1>
    </header>
		<form
			method="post"
			on:submit|preventDefault={submit}
			encType="multipart/form-data"
			class="mx-auto flex  flex-col rounded-lg border bg-neutral-100 p-8">
			<label for="file" class="font-semibold"
				>Select an audio file (max 25mb) (m4a, mp3, mp4, mpeg, mpga, wav, webm)</label>
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
	{#if result.summary.length > 0}
		<section class="container prose mt-10">
			<header class="flex justify-between">
				<h1>Summary</h1>
				<Button
					styleClasses="flex h-10 items-center gap-3"
					onClick={() => copyToClipboard(result.summary)}>
					Copy to clipboard
					<Copy />
				</Button>
				<Button
					styleClasses="flex h-10 items-center gap-3"
					onClick={() => download(result.summary, 'summary')}>Download<Download /></Button>
			</header>
			<p id="summary" class="">{result.summary}</p>
		</section>
	{/if}
	{#if result.transcript.length > 0}
		<section class="container prose mt-10">
			<header class="flex justify-between">
				<h1>Transcript</h1>
				<Button
					styleClasses="flex h-10 items-center gap-3"
					onClick={() => copyToClipboard(result.transcript)}>
					Copy to clipboard
					<Copy />
				</Button>
				<Button
					styleClasses="flex h-10 items-center gap-3"
					onClick={() => download(result.transcript, 'transcript')}>Download<Download /></Button>
			</header>
			<p id="transcript" class="">{result.transcript}</p>
		</section>
	{/if}
</main>
