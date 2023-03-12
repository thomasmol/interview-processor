<script lang="ts">
	import { page } from '$app/stores';
	import Profile from '$lib/icons/Profile.svelte';

</script>

<nav class="bg-gray-100 py-4 border-b">
	<div class="container flex justify-between">
		<div class="">
			<a href="/audios" class="font-semibold">
				🎙️ AudioDigest.app
			</a>
		</div>
		<div class="links">
			<a href="/profile" class="flex items-center gap-2">{$page.data.session?.user?.email} <Profile/></a>
		</div>
	</div>
</nav>
