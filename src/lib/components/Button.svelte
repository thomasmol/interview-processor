<script lang="ts">
	export let type: 'button' | 'submit' | 'reset' | null | undefined = 'button';
  export let styleClasses: string = '';
	export let onClick: () => void = () => {};
</script>

<button
	{type}
	on:click={onClick}
	class="text-semibold rounded bg-neutral-800 px-4 py-2 text-white hover:bg-neutral-900 {styleClasses}">
	<slot />
</button>
