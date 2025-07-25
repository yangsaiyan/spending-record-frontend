<script>
	import NavigationBar from '$lib/Components/NavigationBar.svelte';
	import { checkAuth } from '$lib/utils/tools';
	import { onMount } from 'svelte';

	onMount(() => {
		checkAuth();
	});
</script>

<div class="w-[100dvw] h-[100dvh] flex flex-col items-center justify-start">
	<NavigationBar />
	<slot />
</div>
