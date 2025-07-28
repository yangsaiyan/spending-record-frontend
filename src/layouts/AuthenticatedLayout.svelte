<script lang="ts">
	import NavigationBar from '$lib/Components/NavigationBar.svelte';
	import CommonToast from '$lib/Components/Toast/CommonToast.svelte';
	import { checkAuth } from '$lib/utils/tools';
	import { onMount } from 'svelte';

	onMount(() => {
		checkAuth();
	});
</script>

<div class="flex h-[100dvh] w-[100dvw] flex-col items-center justify-start">
	<NavigationBar />
	<slot />
	<CommonToast />
</div>
