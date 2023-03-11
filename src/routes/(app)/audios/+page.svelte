<script lang="ts">
	import type { PageData } from './$types';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch
	} from 'flowbite-svelte';

	export let data: PageData;
	//date format
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric'
	};

	let searchTerm = '';

	$: filteredItems = data.audios.filter(
		(audio) => audio.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
	);
</script>

<section class="container">
	<header class="mt-10 mb-5">
		<h1 class="text-lg font-semibold">All your audios</h1>
	</header>
	<div class="rounded-lg border bg-white">
		<div class="px-4 pt-4">
			<a
				href="/audios/create"
				class="rounded bg-sky-600 py-2 px-4 font-bold text-white hover:bg-sky-700">
				Add audio
			</a>
		</div>
		<TableSearch
			hoverable={true}
			bind:inputValue={searchTerm}
			divClass="relative overflow-x-auto sm:rounded-lg">
			<TableHead theadClass="border-y text-xs uppercase">
				<TableHeadCell>Audio name</TableHeadCell>
				<TableHeadCell>Transcript</TableHeadCell>
				<TableHeadCell>Created At</TableHeadCell>
				<TableHeadCell />
			</TableHead>
			<TableBody tableBodyClass="divide-y">
				{#each filteredItems as audio}
					<TableBodyRow>
						<TableBodyCell>{audio.name}</TableBodyCell>
						<TableBodyCell><p class="w-16 truncate">{audio.transcript}</p></TableBodyCell>
						<TableBodyCell
							>{new Date(audio.createdAt).toLocaleDateString('en-UK', options)}</TableBodyCell>
						<TableBodyCell
							><a
								href="/audios/{audio.id}"
								class="font-medium text-blue-600 hover:underline dark:text-blue-500">
								View
							</a>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</TableSearch>
	</div>
</section>
