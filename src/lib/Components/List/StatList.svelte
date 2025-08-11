<script lang="ts">
	import { categoriesTotal, currency, totalSpent } from '$lib/store/store';
</script>

<div class="flex h-full w-full flex-col items-center justify-start gap-4 overflow-y-auto scrollbar-hide">
	<div class="flex h-fit w-full flex-col items-start justify-center gap-2">
		<div class="badge badge-success">Total spent</div>
		<p class="text-lg font-bold text-white">
			{$currency}
			{$totalSpent}
		</p>
	</div>
	{#if $categoriesTotal.length > 3}
		<div class="divider"></div>
	{/if}
	<div class="flex h-fit w-full flex-col items-start justify-center gap-4">
		{#if $categoriesTotal.length > 3}
			<div class="badge badge-success">Other categories</div>
		{/if}
		{#each $categoriesTotal.slice(3) as category}
			<div class="flex h-fit w-full flex-col items-start justify-center gap-2">
				<p class="text-sm text-white">
					{category.category.slice(0, 1).toUpperCase() + category.category.slice(1)}
				</p>
				<p class="text-lg font-bold text-white">
					{$currency}
					{category.amount}
				</p>
			</div>
		{/each}
	</div>
</div>
