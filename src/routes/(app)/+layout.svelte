<script>

	import Navbar from "$lib/components/Navbar.svelte";
	import Footer from "$lib/sections/Footer.svelte";

</script>
<svelte:head>
	<title>AudioDigest | App</title>
</svelte:head>
<Navbar/>
<main class="bg-gray-50 h-full">
	<slot />
</main>
<Footer/>
