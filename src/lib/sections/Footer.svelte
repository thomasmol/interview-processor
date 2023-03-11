<script>
	import ExternalLink from '$lib/icons/ExternalLink.svelte';
	const year = new Date().getFullYear();
	const version = '1.0';
</script>

<footer class="mt-10 bg-neutral-900 py-6 bottom-0 ">
	<div class="container flex flex-wrap justify-center gap-14">
		<p class="text-neutral-400">
			&copy; {year} <a href="https://thomasmol.com" target="_blank" rel="noreferrer">Thomas Mol</a>
			 - v{version}
		</p>
		<p class="text-white">🤲 Feedback/collaborate &rarr;</p>
		<a
			href="http://twitter.com/thomas_a_mol"
			target="_blank"
			rel="noreferrer"
			class="inline-flex items-center gap-2 text-white underline hover:text-neutral-200"
			>🐦 Twitter <ExternalLink /></a>
		<a
			href="https://www.linkedin.com/in/thomas-mol/"
			target="_blank"
			rel="noreferrer"
			class="inline-flex items-center gap-2 text-white underline hover:text-neutral-200"
			>🗃️ LinkedIn <ExternalLink /></a>
		<a
			href="https://github.com/thomasmol/interview-processor"
			target="_blank"
			rel="noreferrer"
			class="inline-flex items-center gap-2 text-white underline hover:text-neutral-200"
			>Github Repo <ExternalLink /></a>
	</div>
</footer>
