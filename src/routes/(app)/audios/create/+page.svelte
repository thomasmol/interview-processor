<script lang="ts">
	import Copy from '$lib/icons/Copy.svelte';
	import Download from '$lib/icons/Download.svelte';
	import Loading from '$lib/icons/Loading.svelte';
	import Upload from '$lib/icons/Upload.svelte';
	import { Fileupload, Label, Input, Helper, Dropzone, Button } from 'flowbite-svelte';

	let prompt: string = '';
	let files: FileList;
	let loading = false;
	let result: Interview = {
		summary: '',
		transcript: ''
	};
	let audioDurationMinutes: number = 0;
	let transcriptLength: number = 0;

	const submit = async () => {
		await submitAudio();
		await submitTranscript();

		try {
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
			});
		} catch (e) {
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
	};

	$: if (files && files[0]) {
		const audio = new Audio(URL.createObjectURL(files[0]));
		audio.onloadedmetadata = () => {
			audioDurationMinutes = Math.round(audio.duration / 4 / 60);
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
			<h1 class="text-center text-xl font-semibold">Start processing an audio file</h1>
		</header>
		<form
			method="post"
			on:submit|preventDefault={submit}
			encType="multipart/form-data"
			class="mx-auto flex max-w-3xl flex-col rounded-lg border bg-gray-100 p-8">
			<Label for="dropzone-file" class="pb-2 text-xl font-semibold">Upload an audio file</Label>
			<div class="flex w-full items-center justify-center">
				<label
					for="dropzone-file"
					class="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
					<div class="flex flex-col items-center justify-center pt-5 pb-6">
						<span class="p-3 text-3xl text-gray-600">
							<Upload />
						</span>
						{#if files && files[0]}
							<p class="mb-2 text-lg text-sky-700">
								<span class="font-semibold">{files[0].name}</span>
							</p>
						{:else}
							<p class="mb-2 text-lg">-</p>
						{/if}
						<p class="mb-2 text-sm text-gray-500">
							<span class="font-semibold">Click to upload</span> or drag and drop an audio file
						</p>
						<p class="text-xs text-gray-500">
							m4a, mp3, mp4, mpeg, mpga, wav or webm (MAX. 50mb)
						</p>
					</div>
					<input id="dropzone-file" type="file" class="hidden" bind:files />
				</label>
			</div>
			<Label for="prompt" class="mt-6">What is the audio about?</Label>
			<Input
				id="prompt"
				type="text"
				value={prompt}
				class="mt-2 rounded"
				autocomplete="off"
				required
				placeholder="&quot;An interview between a designer and product owner&quot;" />

			{#if loading}
				<div class="mt-10 inline-flex justify-center gap-2">
					<p class="">loading...</p>
					<p class="text-neutral-800"><Loading /></p>
				</div>
			{:else}
				<Button color="blue" type="submit">Process</Button>
			{/if}
			{#if audioDurationMinutes}
				<p class="mt-4">
					Estimated time to process: <span class="font-semibold">{audioDurationMinutes}</span> minutes
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
