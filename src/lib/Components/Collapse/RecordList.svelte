<script lang="ts">
	import DeleteRecord from '$lib/Components/Buttons/DeleteRecord.svelte';
	import EditRecord from '$lib/Components/Buttons/EditRecord.svelte';
	import {
		isLoading,
		searchPage,
		searchRecords,
		searchTotalPages,
		triggerSearch,
		activeRecord,
		currency
	} from '$lib/store/store';
	import { convertNumberToCategory } from '$lib/utils/tools';
	import { onMount } from 'svelte';

	let searchParams = $state<URLSearchParams>(new URLSearchParams());
	let page = $state<number>($searchPage);

	async function handlePreviousPage() {
		$activeRecord = 0;
		const searchParams = new URLSearchParams(window.location.search);
		searchParams.set('page', (page - 1).toString());
		window.history.pushState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
		$searchPage = page - 1;
		$triggerSearch?.(page - 1);
		page--;
	}

	async function handleNextPage() {
		$activeRecord = 0;
		const searchParams = new URLSearchParams(window.location.search);
		searchParams.set('page', (page + 1).toString());
		window.history.pushState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
		$searchPage = page + 1;
		$triggerSearch?.(page + 1);
		page++;
	}

	onMount(() => {
		searchParams = new URLSearchParams(window.location.search);
		if (searchParams.get('page')) {
			page = Number(searchParams.get('page')) || 1;
			$searchPage = page;
		} else {
			searchParams.set('page', '1');
			window.history.pushState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
		}
	});
</script>

<div
	class="flex h-full w-9/10 flex-col justify-between gap-4 overflow-x-hidden overflow-y-scroll py-3"
>
	{#if $isLoading}
		<div class="skeleton h-full min-h-12 w-full"></div>
		<div class="skeleton h-full min-h-12 w-full"></div>
		<div class="skeleton h-full min-h-12 w-full"></div>
		<div class="skeleton h-full min-h-12 w-full"></div>
		<div class="skeleton h-full min-h-12 w-full"></div>
	{:else}
		<div class="flex h-full flex-col gap-2">
			{#each $searchRecords as record, index}
				<div class="text-black-content border-base-400 collapse w-full border-2 bg-transparent">
					<input
						type="checkbox"
						checked={$activeRecord === index + 1}
						class="peer"
						onclick={() => ($activeRecord = index + 1)}
					/>
					<div
						class="collapse-title peer-checked:bg-success peer-checked:text-success-content flex flex-row items-center gap-2 font-semibold"
					>
						<span class="badge badge-success font-bold"
							>{convertNumberToCategory(record.category)}</span
						>
						- {record.date.split('T')[0]}
					</div>
					<div
						class="collapse-content peer-checked:bg-success peer-checked:text-success-content flex flex-row justify-between pt-2 text-sm"
					>
						<div class="flex max-h-40 w-full flex-col items-start gap-2 text-wrap">
							<p class="text-sm">
								{$currency}
								{record.amount}
							</p>
							<p class="line-clamp-4 overflow-hidden pr-3 text-sm text-ellipsis">
								{record.description}
							</p>
						</div>
						<div class="flex flex-col gap-2">
							<EditRecord {record} />
							<DeleteRecord {record} />
						</div>
					</div>
				</div>
			{/each}
		</div>
		{#if $searchRecords.length === 0 && !$isLoading}
			<div class="flex flex-col items-center justify-center">
				<p class="text-center text-2xl font-bold">No records found</p>
			</div>
		{/if}
	{/if}
	<div class="join grid grid-cols-2">
		<button
			class="join-item btn btn-outline"
			disabled={page === 1 || $isLoading || $searchRecords.length === 0 || $searchTotalPages === 0}
			onclick={handlePreviousPage}>Previous</button
		>
		<button
			class="join-item btn btn-outline"
			disabled={page === $searchTotalPages ||
				$isLoading ||
				$searchRecords.length === 0 ||
				$searchTotalPages === 0}
			onclick={handleNextPage}>Next</button
		>
	</div>
</div>
