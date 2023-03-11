<script>
	import ExternalLink from '$lib/icons/ExternalLink.svelte';
	const version = '1.1';
</script>

<footer class="bg-neutral-800 py-4 bottom-0 ">
	<div class="container flex flex-wrap justify-center gap-14">
		<p class="text-neutral-400">
			 by <a href="https://thomasmol.com" target="_blank" rel="noreferrer">@thomasmol</a>
			 | v{version}
		</p>
		<p class="text-white">🤲 Feedback/collaborate &rarr;</p>
		<a
			href="http://twitter.com/thomas_a_mol"
			target="_blank"
			rel="noreferrer"
			class="inline-flex items-center gap-2 text-white  hover:text-neutral-200"
			>🐦 Twitter <ExternalLink /></a>
		<a
			href="https://www.linkedin.com/in/thomas-mol/"
			target="_blank"
			rel="noreferrer"
			class="inline-flex items-center gap-2 text-white  hover:text-neutral-200"
			>🗃️ LinkedIn <ExternalLink /></a>
		<a
			href="https://github.com/thomasmol/interview-processor"
			target="_blank"
			rel="noreferrer"
			class="inline-flex items-center gap-2 text-white  hover:text-neutral-200"
			>Github Repo <ExternalLink /></a>
	</div>
</footer>
