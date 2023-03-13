<script lang="ts">
	import { page } from '$app/stores';
	import DangerAlert from '$lib/components/DangerAlert.svelte';
	import SuccessAlert from '$lib/components/SuccessAlert.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<h1 class="text-2xl font-bold">General settings</h1>
<form method="post" class="mt-4">
	<div class="mb-4 grid gap-4 sm:mb-5 sm:grid-cols-2 sm:gap-6">
		<div class="w-full">
			<label for="name" class="mb-2 block text-sm font-medium text-gray-900">Your name</label>
			<input
				type="text"
				name="name"
				id="name"
				class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-sky-600 focus:ring-sky-600"
				value={$page.data.session?.user?.name}
				placeholder="Name" />
		</div>
		<div class="w-full">
			<label for="email" class="mb-2 block text-sm font-medium text-gray-900">Email</label>
			<input
				type="email"
				name="email"
				id="email"
				class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-sky-600 focus:ring-sky-600"
				value={$page.data.session?.user?.email}
				placeholder="something@mail.com"
				required />
		</div>
		<div class="w-full">
			<label for="avatar" class="mb-2 block text-sm font-medium text-gray-900">Avatar url</label>
			<input
				type="url"
				name="avatar"
				id="avatar"
				class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-sky-600 focus:ring-sky-600"
				value={$page.data.session?.user?.image}
				placeholder="someimage.png" />
		</div>
	</div>
	<div class="flex items-center space-x-4">
		<button
			type="submit"
			class="rounded-lg bg-sky-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-4 focus:ring-sky-300">
			Update account
		</button>
	</div>
</form>
<div class="mt-4">
	{#if form?.success}
		<SuccessAlert alert="Success!" message="Your account has been updated." />
	{:else if form?.success}
		<DangerAlert alert="Error!" message="Something went wrong. Please try again." />
	{/if}
</div>
