<script>
	import AppNavbar from '$lib/components/AppNavbar.svelte';
	import Footer from '$lib/sections/Footer.svelte';
</script>

<svelte:head>
	<title>AudioDigest | App</title>
</svelte:head>
<AppNavbar />
<main class="bg-gray-50 flex-grow">
	<slot />
</main>
<Footer />
