<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import LinkButton from '$lib/components/LinkButton.svelte';
	import ExternalLink from '$lib/icons/ExternalLink.svelte';
	import Footer from '$lib/sections/Footer.svelte';
</script>

<main>
	<section class="container">
		<header class="py-20 text-center">
			<h1 class="text-4xl font-semibold text-neutral-800">Title</h1>
			<h2 class="mt-3 text-2xl text-neutral-700">Subtitle</h2>
		</header>
		<p class="mt-2 text-neutral-600 ">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam quaerat exercitationem rerum
			nemo? Animi dicta voluptas quaerat reprehenderit itaque aliquam blanditiis repudiandae vero ex
			quis nulla, quisquam nihil. Totam, doloribus.
		</p>
		<Button type="button">Button</Button>
		<LinkButton
			href="https://thomasmol.com"
			target="_blank"
			styleClasses="inline-flex items-center gap-2">Link Button <ExternalLink /></LinkButton>
	</section>
</main>
<Footer />
