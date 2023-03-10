<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import Footer from '$lib/sections/Footer.svelte';

	let email = '';
</script>

<main class="container">
	<div class="mx-auto mt-10 max-w-md rounded-lg  border bg-neutral-50 p-10">
		<h1 class="text-center text-xl font-semibold text-slate-800">
			Sign in to use interview processor
		</h1>
		<p class="mt-4 flex flex-col">
			<input type="email" bind:value={email} id="email" class="rounded" placeholder="email" />
			<button on:click={() => signIn('email', {email})} class="rounded border bg-slate-800 p-2 text-white"
				>Sign In with Email magic link</button>
		</p>
	</div>
</main>

<Footer />
