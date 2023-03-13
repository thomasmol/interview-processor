<script lang="ts">
	import { page } from '$app/stores';
	import DangerAlert from '$lib/components/DangerAlert.svelte';
	import SuccessAlert from '$lib/components/SuccessAlert.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<section id="contact" class="py-12">
	<div class="container">
		<header class="mx-auto max-w-xl text-center">
			<h1 class="text-center text-3xl font-semibold">Reach out to us</h1>
			<h2 class="mt-6  text-xl text-gray-800">
				Got a technical issue? Want to send feedback about a feature?
			</h2>
		</header>
		<form
			method="post"
			class="mx-auto mt-4 max-w-xl space-y-8 rounded-lg border bg-white p-5 shadow-sm">
			<div>
				<label for="subject" class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
					>Subject</label>
				<input
					type="text"
					id="subject"
					name="subject"
					class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:shadow-sm-light dark:focus:border-sky-500 dark:focus:ring-sky-500"
					placeholder="Let us know how we can help you"
					required />
			</div>
			<div class="sm:col-span-2">
				<label for="message" class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
					>Your message</label>
				<textarea
					id="message"
					rows="6"
					name="message"
					class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-sky-500 dark:focus:ring-sky-500"
					placeholder="Leave a comment..." />
			</div>
			<button
				type="submit"
				class="rounded-lg bg-sky-700 py-3 px-5 text-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-4 focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800 sm:w-fit"
				>Send message</button>
		</form>
		{#if form?.success}
			<div class="mt-4">
				<SuccessAlert
					alert="Message has been sent successfuly."
					message="We'll contact you ASAP." />
			</div>
		{/if}
	</div>
</section>
