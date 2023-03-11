<script>

	import Navbar from "$lib/components/Navbar.svelte";
	import Footer from "$lib/sections/Footer.svelte";

</script>
<svelte:head>
	<title>AudioDigest | App</title>
</svelte:head>
<Navbar/>
<slot />
<Footer/>
