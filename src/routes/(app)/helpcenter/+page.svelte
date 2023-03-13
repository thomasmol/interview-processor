<script lang="ts">
	import InformationCircle from '$lib/icons/InformationCircle.svelte';

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
			answer: 'You can start by clicking the "Audios" link in the navigation bar, and click the "Add Audio" button.'
		}
	];
</script>

<section id="faq" class="mt-10 mb-10">
	<div class="container">
		<header>
			<h1 class="text-center text-3xl font-semibold">Frequently Asked Questions</h1>
		</header>
		<div class="mt-14 grid gap-x-10 ">
			{#each faqs as faq}
				<div class="mt-10 flex items-center gap-4">
					<div class="text-2xl">
						<InformationCircle />
					</div>
					<div>
						<h2 class="text-md font-semibold">{faq.question}</h2>
						<p class="mt-2  text-gray-800">
							{faq.answer}
						</p>
					</div>
				</div>
			{/each}
		</div>
		<p class="mt-10 text-xl">
			Need more help? <a href="/support" class="font-semibold text-sky-600 hover:text-sky-800"
				>Contact support</a>
		</p>
	</div>
</section>
