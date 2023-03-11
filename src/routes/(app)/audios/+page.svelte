<script lang="ts">
	import type { PageData } from './$types';
	import { invalidateAll } from '$app/navigation';

	export let data: PageData;
	//date format
	const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
</script>

<main class="h-full">
	<section class="container">
    <header class="mt-10 mb-5">
      <h1 class="text-lg font-semibold">All your interviews</h1>
    </header>

		<div class="relative overflow-x-auto  sm:rounded-lg">
			<table class="w-full text-left text-sm text-gray-500">
				<thead class="bg-gray-50 text-xs uppercase text-gray-700 border">
					<tr>
						<th scope="col" class="px-6 py-3"> Audio name </th>
						<th scope="col" class="px-6 py-3"> Transcript </th>
						<th scope="col" class="px-6 py-3"> Created At </th>
						<th scope="col" class="px-6 py-3">
							<span class="sr-only">View</span>
						</th>
					</tr>
				</thead>
				<tbody>
					{#each data.audios as audio}
						<tr class="border-b border-x  bg-white  hover:bg-gray-100 ">
							<th scope="row" class="py-4 font-medium text-gray-900 ">
								<p class="line-clamp-1">{audio.name}</p>
							</th>
							<td class="px-6 py-4 max-w-xs">
								<p class="line-clamp-1">{audio.transcript}</p>
							</td>

							<td class="px-6 py-4">
								{new Date(audio.createdAt).toLocaleDateString('en-UK', options)}
							</td>
							<td class="px-6 py-4 text-right">
								<a href="/interviews/{audio.id}" class="font-medium text-blue-600  hover:underline"
									>View</a>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>
</main>
