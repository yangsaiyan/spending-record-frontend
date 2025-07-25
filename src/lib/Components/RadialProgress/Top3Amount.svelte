<script lang="ts">
	import { categoriesTotal, isLoading, top3TimeDays, totalSpent } from '$lib/store/store';
	import { useFetchGet } from '$lib/utils/fetch';
	import { convertNumberToCategory } from '$lib/utils/tools';

	let value: number;
	let total = $state(0);

	async function fetchData() {
		isLoading.set(true);
		try {
			value = $top3TimeDays;
			const res = await useFetchGet({ method: 'record_get-days-categories', query: `/${value}` });
			const sortedCategories = Object.entries(res.data).sort((a, b) => Number(b[1]) - Number(a[1]));
			const categories = sortedCategories.map((item) => ({
				category: convertNumberToCategory(Number(item[0])),
				amount: Number(item[1])
			}));
			total = categories.reduce((acc, item) => acc + item.amount, 0);
			totalSpent.set(total);
			categoriesTotal.set(categories);
			isLoading.set(false);
		} catch (error) {
			console.error(error);
			isLoading.set(false);
		}
	}

	$effect(() => {
		fetchData();
	});
</script>

<div class="flex h-full max-h-[500px] w-full max-w-[1280px] flex-col items-center justify-between gap-2">
	<p class="text-sm text-gray-500">Top 3 categories</p>
	<div class="flex h-full w-full flex-row items-center justify-center gap-2">
		{#if $categoriesTotal.length > 2}
			<div class="flex h-full w-full flex-col items-center">
				<div
					class="radial-progress mt-auto aspect-square h-auto min-h-[50px] w-full min-w-[50px] max-w-[150px] max-h-[150px] after:bg-transparent"
					style="--value:{($categoriesTotal[1].amount / $totalSpent) * 100};"
					aria-valuenow={$categoriesTotal[1].amount}
					role="progressbar"
				>
					{(($categoriesTotal[1].amount / $totalSpent) * 100).toFixed(2)}%
				</div>
				<span class="text-sm text-gray-500"
					>{$categoriesTotal[1].category.slice(0, 1).toUpperCase() +
						$categoriesTotal[1].category.slice(1)}</span
				>
				<span class="text-sm text-gray-500">${$categoriesTotal[1].amount}</span>
			</div>
			<div class="h-full w-full">
				<div class="flex h-full w-full flex-col items-center justify-start">
					<div
						class="radial-progress aspect-square h-auto min-h-[50px] w-full min-w-[50px] max-w-[150px] max-h-[150px] after:bg-transparent"
						style="--value:{($categoriesTotal[0].amount / $totalSpent) * 100};"
						aria-valuenow={$categoriesTotal[0].amount}
						role="progressbar"
					>
						{(($categoriesTotal[0].amount / $totalSpent) * 100).toFixed(2)}%
					</div>
					<span class="text-sm text-gray-500"
						>{$categoriesTotal[0].category.slice(0, 1).toUpperCase() +
							$categoriesTotal[0].category.slice(1)}</span
					>
					<span class="text-sm text-gray-500">${$categoriesTotal[0].amount}</span>
				</div>
			</div>
			<div class="flex h-full w-full flex-col items-center">
				<div
					class="radial-progress mt-auto aspect-square h-auto min-h-[50px] w-full min-w-[50px] max-w-[150px] max-h-[150px] after:bg-transparent"
					style="--value:{($categoriesTotal[2].amount / $totalSpent) * 100};"
					aria-valuenow={$categoriesTotal[2].amount}
					role="progressbar"
				>
					{(($categoriesTotal[2].amount / $totalSpent) * 100).toFixed(2)}%
				</div>
				<span class="text-sm text-gray-500"
					>{$categoriesTotal[2].category.slice(0, 1).toUpperCase() +
						$categoriesTotal[2].category.slice(1)}</span
				>
				<span class="text-sm text-gray-500">${$categoriesTotal[2].amount}</span>
			</div>
		{/if}
	</div>
</div>
