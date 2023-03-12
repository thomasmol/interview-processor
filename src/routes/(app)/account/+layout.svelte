<script lang="ts">
	import { page } from '$app/stores';
	import Profile from '$lib/icons/Profile.svelte';
</script>

<div class="container mt-10 flex gap-14">
	<nav id="navbar" class="">
		<div class="flex items-center gap-4">
			<div class="rounded-full bg-gray-200 p-3 text-gray-500 ring ring-gray-300">
				{#if $page.data.session?.user?.image}
					<img src={$page.data.session?.user?.image} alt="avatar" height="20" width="20" />
				{:else}
					<Profile />
				{/if}
			</div>
			<div>
				{#if $page.data.session?.user?.name}
					<p>{$page.data.session?.user?.name}</p>
				{:else}
					<p>-</p>
				{/if}
				<p class="truncate font-medium">{$page.data.session?.user?.email}</p>
			</div>
		</div>
		<div class="mt-10 flex flex-col space-y-4">
			<a href="/account" class="text-xl font-semibold hover:text-sky-800 hover:underline"
				>General</a>
			<a href="/account/usage" class="text-xl font-semibold hover:text-sky-800 hover:underline"
				>Usage</a>
			<a href="/account/billing" class="text-xl font-semibold hover:text-sky-800 hover:underline"
				>Billing</a>
		</div>
	</nav>
	<section class="flex-grow ">
		<slot />
	</section>
</div>
