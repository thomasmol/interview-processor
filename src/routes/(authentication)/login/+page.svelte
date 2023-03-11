<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import Footer from '$lib/sections/Footer.svelte';

	let email = '';
</script>

<main class="h-full bg-gray-50">
	<section id="login" class="py-20">
		<header class="py-10 text-center">
			<h1 class="text-2xl font-semibold">Start using 🎙️ AudioDigest</h1>
		</header>
		<div class="container rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
			<div class="space-y-4 p-6 sm:p-8 md:space-y-6">
				<h3 class="text-xl font-bold text-gray-900  md:text-2xl">Sign in using your email</h3>
				<form class="space-y-4 md:space-y-6" on:submit|preventDefault={() => signIn('email', {email})}>
					<div>
						<label for="email" class="mb-2 block text-sm font-medium text-gray-900 "
							>Your email</label>
						<input
							type="email"
							bind:value={email}
							id="email"
							class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-sky-600 focus:ring-sky-600 sm:text-sm"
							placeholder="name@mail.com"
							required />
					</div>

					<button
						type="submit"
						class="w-full rounded-lg bg-sky-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-300"
						>Send login link</button>
				</form>
			</div>
		</div>
	</section>
</main>

<Footer />
