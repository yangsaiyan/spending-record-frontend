<script>
	import AuthCard from '$lib/Components/Cards/AuthCard.svelte';
	import AuthTabs from '$lib/Components/Tabs/AuthTabs.svelte';
	import { checkAuth } from '$lib/utils/tools';
	import { onMount } from 'svelte';

	onMount(() => {
		checkAuth();
	});
</script>

<div class="flex h-screen flex-col items-center justify-center px-4">
	<div class="flex w-full max-w-160 min-w-64 flex-col items-center justify-center gap-2">
		<AuthTabs />
		<AuthCard />
	</div>
</div>
