<script>
	import AuthCard from '$lib/Components/Cards/AuthCard.svelte';
	import AuthTabs from '$lib/Components/Tabs/AuthTabs.svelte';
</script>

<div class="flex h-screen flex-col items-center justify-center px-4">
	<div class="min-w-64 max-w-160 w-full flex flex-col items-center justify-center gap-2">
		<AuthTabs />
		<AuthCard />
	</div>
</div>
