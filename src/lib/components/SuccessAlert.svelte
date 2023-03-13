<script lang="ts">
	export let message: string;
	export let alert: string;
</script>

<div
	class="mb-4 rounded-lg bg-green-50 p-4 text-sm text-green-800 dark:bg-gray-800 dark:text-green-400"
	role="alert">
	<span class="font-medium">{alert}</span>
	{message}
</div>
