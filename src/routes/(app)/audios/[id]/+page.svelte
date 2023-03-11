<script lang="ts">
	import Navbar from "$lib/components/Navbar.svelte";
	import Footer from "$lib/sections/Footer.svelte";
  import type { PageData } from './$types';

	export let data: PageData;


</script>
<main class="h-full">
<section class="container">
  <header class="mt-10 mb-5">
    <h1>Interview</h1>
  </header>
  <h2>{data.audio.name}</h2>
  <h3 class="mt-2">{data.audio.createdAt}</h3>
  <p class="mt-4">{data.audio.summary}</p>
  <p class="mt-4">{data.audio.transcript}</p>
</section>
</main>
