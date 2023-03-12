<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/sections/Footer.svelte';
</script>

<svelte:head>
	<title>AudioDigest | App</title>
</svelte:head>
<Navbar />
<main class="h-full bg-gray-50">
	<slot />
</main>
<Footer />
