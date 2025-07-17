<script lang="ts">
	import ResetCard from '$lib/Components/Cards/ResetCard.svelte';
	import ResetSteps from '$lib/Components/Steps/ResetSteps.svelte';
	import { isLoading } from '$lib/store/store';
</script>

<div class="flex h-screen flex-col items-center justify-center px-4">
	{#if !$isLoading}
		<ResetCard />
	{/if}
	{#if $isLoading}
		<ResetSteps />
	{/if}
</div>
