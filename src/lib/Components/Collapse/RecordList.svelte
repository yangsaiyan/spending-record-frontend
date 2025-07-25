<script lang="ts">
	import { searchRecords, searchTotal } from '$lib/store/store';
	import { convertNumberToCategory } from '$lib/utils/tools';
	import { onMount } from 'svelte';
	let page = $state<number>(1);

	function handlePreviousPage() {
		const searchParams = new URLSearchParams(window.location.search);
		searchParams.set('page', (page - 1).toString());
		window.history.pushState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
	}

	function handleNextPage() {
		const searchParams = new URLSearchParams(window.location.search);
		searchParams.set('page', (page + 1).toString());
		window.history.pushState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
	}

	onMount(() => {
		page = Number(new URLSearchParams(window.location.search).get('page')) || 1;
	});
</script>

<div class="flex w-9/10 flex-col gap-4 overflow-x-hidden overflow-y-scroll">
	{#each $searchRecords as record}
		<div class="text-black-content border-base-400 collapse w-full border-2 bg-transparent">
			<input type="checkbox" class="peer" />
			<div
				class="collapse-title peer-checked:bg-success peer-checked:text-success-content flex flex-row items-center gap-2 font-semibold"
			>
				<span class="badge badge-success font-bold">{convertNumberToCategory(record.category)}</span
				>
				- {record.date.split('T')[0]}
			</div>
			<div
				class="collapse-content peer-checked:bg-success peer-checked:text-success-content flex flex-row justify-between pt-2 text-sm"
			>
				<div class="flex max-h-40 w-full flex-col items-start gap-2 text-wrap">
					<p class="text-sm">${record.amount}</p>
					<p class="line-clamp-4 overflow-hidden pr-3 text-sm text-ellipsis">
						fake descriptionfakefake descriptionfakefake descriptionfakefake descriptionfakefake
						descriptionfake descriptionfake descriptionfake descriptionfake descriptionfake
						descriptionfake descriptionfake descriptionfake descriptionfake descriptionfake
						descriptionfake description
					</p>
				</div>
				<div class="flex flex-col gap-2">
					<button class="btn btn-sm btn-black h-10 font-bold">Edit</button>
					<button class="btn btn-sm btn-error h-10 font-bold">Delete</button>
				</div>
			</div>
		</div>
	{/each}
	<div class="join grid grid-cols-2">
		<button
			class="join-item btn btn-outline"
			disabled={page === 1}
			onclick={handlePreviousPage}>Previous</button
		>
		<button class="join-item btn btn-outline" disabled={page === $searchTotal} onclick={handleNextPage}
			>Next</button
		>
	</div>
</div>
