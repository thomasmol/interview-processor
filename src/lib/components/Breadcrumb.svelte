<script lang="ts">
	export let path: string;
	let crumbs: { label: string; href: string }[];
	$: {
		// Remove zero-length tokens
		const tokens = path.split('/').filter((t: string) => t !== '');
		// Create { label, href } pairs for each token.
		let tokenPath = '';
		crumbs = tokens.map((t: string) => {
			tokenPath += '/' + t;
			return {
				label: t,
				href: tokenPath
			};
		});

		// Add a way to get home too.
		crumbs.unshift({ label: 'home', href: '/' });
	}
</script>

<!-- <div class="mb-2 py-3 text-sm  text-slate-700">
	{#each crumbs as c, i}
		{#if i == crumbs.length - 1}
			<span class="font-medium capitalize text-slate-700">{c.label}</span>
		{:else}
			<a href={c.href} class="capitalize hover:underline">{c.label}</a> &rsaquo;&nbsp;
		{/if}
	{/each}
</div> -->
<div class="mb-2 py-3 text-sm font-semibold text-slate-500">
	{#each crumbs as c, i}
		{#if i == crumbs.length - 2}
			<a href={c.href} class="capitalize hover:underline">&lsaquo;&nbsp;{c.label}</a>		
		{/if}
	{/each}
</div>