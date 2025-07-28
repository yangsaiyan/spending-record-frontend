<script lang="ts">
	import { categoriesTotal, totalSpent } from '$lib/store/store';
</script>

<div class="flex h-[25vh] w-full flex-col items-center justify-start gap-4 overflow-y-auto">
	<div class="flex h-fit w-full flex-col items-start justify-center gap-4">
		<div class="badge badge-success">Total spent</div>
		<p class="text-lg font-bold text-white">${$totalSpent}</p>
	</div>
	<div class="divider"></div>
	<div class="flex h-fit w-full flex-col items-start justify-center gap-4">
		<div class="badge badge-success">Other categories</div>
		{#each $categoriesTotal.slice(3) as category}
			<div class="flex h-fit w-full flex-col items-start justify-center gap-4">
				<p class="text-sm text-white">
					{category.category.slice(0, 1).toUpperCase() + category.category.slice(1)}
				</p>
				<p class="text-lg font-bold text-white">${category.amount}</p>
			</div>
		{/each}
	</div>
</div>
