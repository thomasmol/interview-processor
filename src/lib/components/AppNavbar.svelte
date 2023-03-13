<script lang="ts">
	import { page } from '$app/stores';
	import clickOutside from '$lib/clickOutside';
	import ChevronDown from '$lib/icons/ChevronDown.svelte';
	import { signOut } from '@auth/sveltekit/client';

	let letter = '😬';
	let menuOpen = false;

	if ($page.data.session?.user?.name)
		letter = $page.data.session?.user?.name?.slice(0, 2).toUpperCase();
	else if ($page.data.session?.user?.email)
		letter = $page.data.session?.user?.email?.slice(0, 2).toUpperCase();
</script>

<nav class="border-b bg-gray-50">
	<div class="container flex justify-between">
		<div class="py-4">
			<a href="/overview" class="font-semibold">🎙️ AudioDigest.app </a>
		</div>
		<div class="relative float-right flex items-center gap-10">
			<a href="/overview" class="text-sm font-bold hover:text-sky-700">Overview</a>
			<a href="/audios" class="text-sm font-bold hover:text-sky-700">Audios</a>
			<button
				class="flex items-center gap-3"
				on:click={() => {
					menuOpen = !menuOpen;
				}}>
				<div
					class="relative ring ring-gray-300 inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-sky-900">

					{#if $page.data.session?.user?.image}
					<img
						src={$page.data.session?.user?.image}
						alt="avatar"
						height="35"
						width="35"
						class="rounded-full" />
				{:else}
					<div class="p-3">
						<span class="text-sm font-semibold text-gray-100">{letter}</span>
					</div>
				{/if}
				</div>
				<ChevronDown />
			</button>
			{#if menuOpen}
				<div
					id="userDropdown"
					use:clickOutside={() => (menuOpen = false)}
					on:click={() => {
						menuOpen = false;
					}}
					on:keyup={(e) => {
						if (e.key === 'Escape') menuOpen = false;
					}}
					class="absolute right-0 top-14 z-10 w-44 divide-y divide-gray-100 rounded-lg border
					bg-white text-left shadow-lg">
					<div class="px-4 py-3 text-sm text-gray-900">
						{#if $page.data.session?.user?.name}
							<div>{$page.data.session?.user?.name}</div>
						{/if}
						<div class="truncate font-medium">{$page.data.session?.user?.email}</div>
					</div>

					<ul class="py-2 text-sm text-gray-700" aria-labelledby="avatarButton">
						<li>
							<a href="/account" class="block px-4 py-2 hover:bg-gray-100">Account settings</a>
						</li>
						<li>
							<a href="/account/usage" class="block px-4 py-2 hover:bg-gray-100">Usage</a>
						</li>
						<li>
							<a href="/account/billing" class="block px-4 py-2 hover:bg-gray-100">Billing</a>
						</li>
					</ul>
					<div class="py-1">
						<a
							href="/"
							on:click|preventDefault={() => {
								confirm('Are you sure you want to sign out?') &&
								signOut()
								}}
							class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
					</div>
				</div>
			{/if}
		</div>
	</div>
</nav>
