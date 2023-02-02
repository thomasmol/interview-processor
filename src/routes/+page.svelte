<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Download from '$lib/icons/Download.svelte';
	import Footer from '$lib/sections/Footer.svelte';
	import type { PageData, ActionData } from './$types';

	let prompt: string = '';
	let files: FileList;
	let transcript: string = '';
	let loading: boolean = false;
	let result: Interview = {summary: 'Lorem ', transcript: 'Ipsum'};

	const submit = async () => {
		loading = true;
		let audio;
		const reader = new FileReader();
		reader.readAsDataURL(files[0]);
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
		};

		loading = false;
	};

	const download = async (text : string) => {
		const a = document.createElement('a');
		const file = new Blob([text], {type: 'text/plain'});
		a.href = URL.createObjectURL(file);
		a.download = 'download.txt';
		a.click();
	}
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
			class="mx-auto flex max-w-lg flex-col rounded-lg border bg-neutral-100 p-10">
			<label for="file" class="font-semibold">Select an audio file</label>
			<input id="file" type="file" bind:files accept="audio/mp3" class="mt-2" required />
			<label for="prompt" class="mt-4 font-semibold">What is the audio about?</label>
			<input
				id="prompt"
				type="text"
				bind:value={prompt}
				class="mt-2 rounded"
				placeholder="An interview between a designer and product owner" />

			{#if loading}
				<div class="mt-10 inline-flex justify-center gap-2">
					<p class="">loading...</p>
					<div class="h-4 w-4 animate-spin rounded-full border-t-2 border-b-2 border-neutral-500" />
				</div>
			{:else}
				<Button type="submit" styleClasses="mt-4">Process</Button>
			{/if}
		</form>
	</section>
	{#if result}
		<section class="container prose mt-10">
			<header class="flex justify-between">
				<h1>Summary</h1>
				<Button styleClasses="flex h-10 items-center gap-3" onClick={() => download(result.summary)}>Download<Download/></Button>
			</header>
			<p class="" >{result.summary}</p>
		</section>
		<section class="container prose mt-10">
			<header class="flex justify-between">
				<h1>Transcript</h1>
				<Button styleClasses="flex h-10 items-center gap-3" onClick={() => download(result.transcript)}>Download<Download/></Button>
			</header>
			<p class="" >{result.transcript}</p>
		</section>
	{/if}
</main>
<Footer />
