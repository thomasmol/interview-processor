<script lang="ts">
	import { page } from '$app/stores';
	import { signOut } from '@auth/sveltekit/client';

</script>

<nav class="bg-gray-100 py-4 border-b">
	<div class="container flex justify-between">
		<div class="">
			<a href="/audios" class="font-semibold">
				🎙️ AudioDigest.app
			</a>
		</div>
		<div class="links">
			<a href="/profile">{$page.data.session?.user?.email}</a>
      <button on:click={() => signOut()}>Logout</button>
		</div>
	</div>
</nav>
