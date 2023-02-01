<script lang="ts">
	export let href: string = '/';
	export let target: string = '_self';
	export let referrerPolicy: ReferrerPolicy = 'no-referrer';
  export let styleClasses: string = '';

</script>

<a
	{href}
	{target}
	referrerpolicy={referrerPolicy}
	class="text-semibold rounded bg-neutral-800 px-4 py-2 text-white hover:bg-neutral-900 {styleClasses}">
	<slot />
</a>
