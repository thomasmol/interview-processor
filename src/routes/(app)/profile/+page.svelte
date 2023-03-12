<script lang="ts">
  	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import Logout from '$lib/icons/Logout.svelte';
	import { signOut } from '@auth/sveltekit/client';

</script>


<section id="profile" class="container">
  <header class="flex justify-between py-2">
    <h1>Profile</h1>
    <Button
      styleClasses="flex h-10 items-center gap-3"
      onClick={() => signOut()}>
      Logout
      <Logout />
    </Button>
  </header>
  <p class="mt-4">email: {$page.data.session?.user?.email}</p>
  <p class="mt-4">name: {$page.data.session?.user?.name}</p>
  <p class="mt-4">image: {$page.data.session?.user?.image}</p>
  <p class="mt-4">sub plan: ?</p>
</section>