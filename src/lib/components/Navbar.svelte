<script lang="ts">
	import { page } from '$app/stores';
	import { signOut } from '@auth/sveltekit/client';

</script>

<nav class="bg-neutral-100 py-4">
	<div class="container flex justify-between">
		<div class="">
			<a href="/dashboard">
				🎙️ Digestly
			</a>
		</div>
		<div class="space-x-4">
			<a href="/audios" class="">All audios</a>
			<a href="/audios/create">New audio</a>
		</div>
		<div class="links">
			<a href="/profile">{$page.data.session?.user?.email}</a>
      <button on:click={() => signOut()}>Logout</button>
		</div>
	</div>
</nav>
