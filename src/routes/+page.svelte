<script lang="ts">
	import Footer from '$lib/sections/Footer.svelte';
	import type { PageData, ActionData } from './$types';

	export let form: ActionData;
	const interviewTypes = ['coding', 'research', 'customer'];

	const faqs = [
		{
			question: 'How do transcribe interviews?',
			answer: 'You can automatically transcribe any audio file by uploading it.'
		},
		{
			question: 'How do I summarize interviews?',
			answer: 'After the interview is transcribed, the summary will be automatically generated.'
		},
		{
			question: 'Why do I have to describe what the audio is about?',
			answer:
				'Using your one-liner as context, the transcript and summary will be more accurate and relevant.'
		},
		{
			question: 'What languages are supported?',
			answer:
				'Languages are automatically detected when uploading a file. Currently, 🇬🇧 English, 🇳🇱 Dutch, 🇪🇸 Spanish, 🇫🇷 French, 🇩🇪 German, 🇮🇹 Italian and 🇵🇹 Portuguese are supported.'
		},
		{
			question: 'What files are supported?',
			answer:
				'Files of the types m4a, mp3, mp4, mpeg, mpga, wav and webm are supported. This includes recordings files from Zoom, Google Meet, Microsoft Teams, iPhone Voice Memos, etc.'
		},
		{
			question: 'How long does it take to transcribe and summarize an interview?',
			answer:
				'Dependent on the file size, audio duration and your internet speed, it usually only takes a few minutes to transcribe and summarize an interview. '
		},
		{
			question: 'What is the maximum file size supported?',
			answer:
				'Currently the maximum file size is 50MB. If you need to process larger files, please contact us.'
		},
		{
			question: 'How is my data stored?',
			answer:
				'Audio files are never saved, and processed data can only be seen by you. Your data is encrypted on our secure servers. Not even we can view your data.'
		},
		{
			question: 'Where do I start?',
			answer: 'You can start by clicking the "Get Started" button in the navigation bar.'
		}
	];
</script>

<nav class="fixed w-full bg-white/60 py-2 backdrop-blur-md">
	<div class="container">
		<div class="flex items-center justify-between">
			<a href="/" class="text-xl font-bold">🎙️ AudioDigest.app</a>
			<div class="flex items-center gap-8">
				<a href="#features" class="">Features</a>
				<a href="#pricing" class="">Pricing</a>
				<a href="#faq" class="">FAQ</a>
				<a href="#contact" class="">Contact</a>
				<a href="/login" class="" data-sveltekit-reload>Login</a>
				<a href="/login" class="rounded-lg bg-sky-600 px-4 py-2 font-bold text-white"
				data-sveltekit-reload	>Get Started</a>
			</div>
		</div>
	</div>
</nav>
<main>
	<section id="hero" class="py-32">
		<div class="container">
			<header>
				<h1 class="mx-auto mt-20 max-w-3xl text-center text-6xl font-bold">
					Transcribe and summarize any audio. <span class="text-sky-600">In minutes</span>
				</h1>
				<h2 class="mt-14 text-center text-3xl font-semibold">No hassle, and fully encrypted 🔒</h2>
			</header>
			<div class="mt-12 flex items-center justify-center gap-6 text-center">
				<a
					href="/demo"
					class="rounded-lg border border-sky-600 py-2 px-4 text-lg font-semibold text-sky-700"
					>Free demo
				</a>
				<a
					data-sveltekit-reload
					href="/login"
					class="rounded-lg border border-sky-600 bg-sky-600 px-5 py-2 text-lg font-bold text-white hover:border-sky-600 hover:bg-sky-600"
					>Start processing</a>
			</div>
		</div>
	</section>
	<section id="features" class="bg-gray-50 py-32">
		<div class="container">
			<header class="text-center">
				<h1 class="text-3xl font-semibold">Fast, secure and private</h1>
			</header>

			<div class="mt-20 grid grid-cols-3 gap-10">
				<div>
					<h2 class="text-2xl font-semibold">⏱️ Only takes minutes</h2>
					<p class="mt-2 text-lg text-gray-800">
						Upload your audio file and get a transcript and summary in minutes
					</p>
				</div>
				<div>
					<h2 class="text-2xl font-semibold">🔐 Encrypted data</h2>
					<p class="mt-2 text-lg text-gray-800">
						Your data is encrypted on our secure servers. Not even we can view your data.
					</p>
				</div>
				<div>
					<h2 class="text-2xl font-semibold">🕵️ Private</h2>
					<p class="mt-2 text-lg text-gray-800">
						Audio files are never saved, and processed data can only be seen by you.
					</p>
				</div>
			</div>
		</div>
	</section>
	<section id="pricing" class="py-32">
		<div class="container">
			<header>
				<h1 class="text-center text-3xl font-semibold">Simple pricing</h1>
			</header>
			<div class="mx-auto mt-16 grid max-w-2xl gap-x-10 gap-y-5 md:grid-cols-2">
				<div class="flex flex-col justify-between rounded-lg border bg-gray-50 p-5 text-center">
					<div>
						<h2 class="text-2xl font-semibold ">Free tier</h2>
						<p class="mt-2  text-gray-600">Try a demo</p>
						<div class=" mt-4">
							<span class="text-3xl">&euro;0</span>
							<span class="text-sm">/month</span>
						</div>
						<ul class="mt-6 space-y-3 text-left">
							<li>✅ Transcribe audio</li>
							<li>✅ Summarize transcription</li>
							<li>☑️ 10 audios per month</li>
							<li>❌ Transcripts or summaries are not saved</li>
							<li>❌ Data is not encrypted</li>
						</ul>
					</div>
					<a
						href="/demo"
						class="mt-10 w-full rounded-lg border border-sky-600 bg-sky-600 px-5 py-2 text-lg font-bold text-white hover:border-sky-600 hover:bg-sky-600"
						>Try it out</a>
				</div>

				<div class="flex flex-col justify-between rounded-lg border bg-gray-50 p-5 text-center">
					<div>
						<h2 class="text-2xl font-semibold ">Enterprise</h2>
						<p class="mt-2  text-gray-600">Best for large scale uses in large organizations</p>
						<div class=" mt-4">
							<span class="text-3xl">Contact sales</span>
						</div>
						<ul class="mt-6 space-y-3 text-left">
							<li>✅ Transcribe audio</li>
							<li>✅ Summarize transcription</li>
							<li>✅ <strong>&infin;</strong> audios per month</li>
							<li>✅ Save transcriptions</li>
							<li>✅ Save summaries</li>
							<li>✅ Encrypted data</li>
						</ul>
					</div>

					<a
						href="#contact"
						class="mt-10 w-full rounded-lg border border-sky-600 bg-sky-600 px-5 py-2 text-lg font-bold text-white hover:border-sky-600 hover:bg-sky-600"
						>Reach out</a>
				</div>
			</div>
		</div>
	</section>
	<section id="faq" class="bg-gray-50 py-32">
		<div class="container">
			<header>
				<h1 class="text-center text-3xl font-semibold">Frequently Asked Questions</h1>
			</header>
			<div class="mt-14 grid gap-x-10 gap-y-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
				{#each faqs as faq}
					<div class="mt-10">
						<h2 class="text-md font-semibold">{faq.question}</h2>
						<p class="mt-2  text-gray-800">
							{faq.answer}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</section>
	<section id="contact" class="py-24">
		<div class="container">
			<header class="mx-auto max-w-xl text-center">
				<h1 class="text-center text-3xl font-semibold">Reach out to us</h1>
				<h2 class="mt-6  text-xl text-gray-800">
					Got a technical issue? Want to send feedback about a feature? Need details about our
					Business plan? Let us know.
				</h2>
			</header>
			<form method="post" class="mx-auto mt-14 max-w-xl space-y-8 rounded-lg border p-5 shadow-sm">
				<div>
					<label for="email" class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
						>Your email</label>
					<input
						type="email"
						id="email"
						name="email"
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:shadow-sm-light dark:focus:border-sky-500 dark:focus:ring-sky-500"
						placeholder="name@mail.com"
						required />
				</div>
				<div>
					<label
						for="subject"
						class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
					<input
						type="text"
						id="subject"
						name="subject"
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:shadow-sm-light dark:focus:border-sky-500 dark:focus:ring-sky-500"
						placeholder="Let us know how we can help you"
						required />
				</div>
				<div class="sm:col-span-2">
					<label
						for="message"
						class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
						>Your message</label>
					<textarea
						id="message"
						rows="6"
						name="message"
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-sky-500 dark:focus:ring-sky-500"
						placeholder="Leave a comment..." />
				</div>
				<button
					type="submit"
					class="rounded-lg bg-sky-700 py-3 px-5 text-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-4 focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800 sm:w-fit"
					>Send message</button>
			</form>
			{#if form?.success}
				<p class="mx-auto mt-5 max-w-lg text-lg">
					Message has been sent successfuly, we'll contact you ASAP.
				</p>
			{/if}
		</div>
	</section>
</main>
<Footer />
