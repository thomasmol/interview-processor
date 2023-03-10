<script>
	import Footer from '$lib/sections/Footer.svelte';

	const interviewTypes = ['coding', 'research', 'customer'];
</script>

<nav>
	<div class="container" />
</nav>
<main class="h-full">
	<section id="hero" class="py-32">
		<div class="container">
			<header>
				<h1 class="mt-20 text-center text-6xl font-bold">
					Transcribe and summarize interviews. <span class="text-lime-400">In minutes</span>
				</h1>
				<h2 class="mt-14 text-center text-3xl font-semibold">No hassle, just click a button 🫵</h2>
			</header>
			<div class="mt-12 text-center">
				<a
					href="/login"
					class="rounded-lg border border-lime-300 bg-lime-400 px-5 py-3 text-lg font-bold text-lime-900 hover:border-lime-600 hover:bg-lime-600 hover:text-white"
					>Start processing</a>
			</div>
		</div>
	</section>
	<section id="features" class="bg-gray-50 py-24">
		<div class="container">
			<header>
				<h1 class="text-center text-3xl font-semibold">Fast, secure and private</h1>
			</header>

			<div class="mt-10 grid grid-cols-3 gap-10">
				<div>
					<h2 class="text-2xl font-semibold">⏱️ Takes minutes</h2>
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
	<section id="pricing" class="py-24">
		<div class="container">
			<header>
				<h1 class="text-center text-3xl font-semibold">Simple pricing</h1>
			</header>
			<h2>It's free dummy (for now)</h2>
		</div>
	</section>
</main>
<Footer />
