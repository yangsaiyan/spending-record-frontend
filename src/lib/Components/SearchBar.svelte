<script lang="ts">
	import { RecordCategory } from '$lib/constants/record';
	import { onMount } from 'svelte';
	import GeneralCard from './Cards/GeneralCard.svelte';
	import { Datepicker, P } from 'flowbite-svelte';
	import { useFetchGet } from '$lib/utils/fetch';
	import { convertCategoryToNumber } from '$lib/utils/tools';
	import { slide } from 'svelte/transition';

	let page = 1;
	let limit = 5;
	let total: number | null = null;
	let isEnd: boolean = false;
	let isFilterOpen = $state(false);
	let currentFilter = $state<{
		description: string;
		category: RecordCategory[];
		date: {
			from: Date | undefined;
			to: Date | undefined;
		};
	}>({
		description: '',
		category: [],
		date: {
			from: undefined,
			to: undefined
		}
	});
	let searchParams = $state<URLSearchParams>(new URLSearchParams());

	function handleCategoryChange(category: RecordCategory) {
		if (currentFilter.category.includes(category)) {
			currentFilter.category = currentFilter.category.filter((c) => c !== category);
		} else {
			currentFilter.category.push(category);
		}
	}

	function handleDescriptionChange(description: string) {
		currentFilter.description = description;
	}

	function handleDateChange(date: { from: Date | undefined; to: Date | undefined }) {
		currentFilter.date = date;
	}

	function handleResetCalendar() {
		currentFilter.date.from = undefined;
		currentFilter.date.to = undefined;
		searchParams.delete('startDate');
		searchParams.delete('endDate');
		window.history.pushState({}, '', `?${searchParams.toString()}`);
		triggerSearch();
	}

	function handleSearchClick() {
		if (currentFilter.description) {
			searchParams.set('description', currentFilter.description);
		} else {
			searchParams.delete('description');
		}

		if (currentFilter.category.length > 0) {
			searchParams.set(
				'category',
				currentFilter.category.map((category) => convertCategoryToNumber(category)).join(',')
			);
		} else {
			searchParams.delete('category');
		}

		if (currentFilter.date.from) {
			searchParams.set('startDate', currentFilter.date.from.toISOString().split('T')[0]);
		} else {
			searchParams.delete('from');
		}

		if (currentFilter.date.to) {
			searchParams.set('endDate', currentFilter.date.to.toISOString().split('T')[0]);
		} else {
			searchParams.delete('to');
		}
		window.history.pushState({}, '', `?${searchParams.toString()}`);
		triggerSearch();
	}

	function handleSearchEnter(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleSearchClick();
		}
	}

	async function triggerSearch() {
		if (
			!searchParams.get('description') &&
			!searchParams.get('category') &&
			!searchParams.get('startDate') &&
			!searchParams.get('endDate')
		) {
			try {
				const res = await useFetchGet(
					{ method: 'record_get-pagination', data: { page, limit }, query: `/${page}/${limit}` },
					{ withCredentials: true }
				);
				console.log(res);
			} catch (error) {
				console.error(error);
			}
		} else {
			try {
				const res = await useFetchGet({
					method: 'record_get-filtered-records',
					query: `?${searchParams}`
				});
				console.log(res);
			} catch (error) {
				console.error(error);
			}
		}
	}

	onMount(() => {
		searchParams = new URLSearchParams(window.location.search);
		currentFilter.description = searchParams.get('description') || '';
		currentFilter.category = searchParams.get('category')
			? (searchParams.get('category')?.split(',') as RecordCategory[])
			: [];
		currentFilter.date.from = searchParams.get('from')
			? new Date(searchParams.get('startDate')!.split('T')[0])
			: undefined;
		currentFilter.date.to = searchParams.get('endDate')
			? new Date(searchParams.get('endDate')!)
			: undefined;
		triggerSearch();
	});
</script>

<div class="flex w-full flex-col items-center justify-center pt-2">
	<div class="mb-2 flex w-full flex-row items-center justify-center gap-2">
		<label class="input h-fit w-4/5 rounded-full pr-0">
			<input
				type="search"
				class="grow"
				placeholder="Search"
				bind:value={currentFilter.description}
				onchange={() => handleDescriptionChange(currentFilter.description)}
				onkeydown={handleSearchEnter}
			/>
			<button
				class="btn btn-success btn-sm aspect-square rounded-full p-0"
				aria-label="Search"
				onclick={handleSearchClick}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-search"
					viewBox="0 0 16 16"
				>
					<path
						d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
					/>
				</svg>
			</button>
		</label>
		<button
			class="btn btn-ghost btn-sm aspect-square rounded-full p-0"
			aria-label="Filter"
			onclick={() => (isFilterOpen = !isFilterOpen)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="currentColor"
				class="bi bi-toggles2"
				viewBox="0 0 16 16"
			>
				<path d="M9.465 10H12a2 2 0 1 1 0 4H9.465c.34-.588.535-1.271.535-2s-.195-1.412-.535-2" />
				<path
					d="M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6m0 1a4 4 0 1 1 0-8 4 4 0 0 1 0 8m.535-10a4 4 0 0 1-.409-1H4a1 1 0 0 1 0-2h2.126q.138-.534.41-1H4a2 2 0 1 0 0 4z"
				/>
				<path d="M14 4a4 4 0 1 1-8 0 4 4 0 0 1 8 0" />
			</svg>
		</button>
	</div>
	{#if isFilterOpen}
		<div
			class="flex h-fit w-full flex-col items-center justify-center transition-all duration-300 ease-in-out"
			transition:slide={{ duration: 500 }}
		>
			<GeneralCard>
				<div class="md:w-1/2">
					<div class="flex flex-row items-center justify-center gap-2">
						<Datepicker
							range
							bind:rangeFrom={currentFilter.date.from}
							bind:rangeTo={currentFilter.date.to}
							onchange={() =>
								handleDateChange({ from: currentFilter.date.from, to: currentFilter.date.to })}
						/>
						<button class="btn btn-success btn-sm" onclick={handleResetCalendar}>Reset</button>
					</div>
					<P class="mt-4 text-white">
						Selected range:
						{currentFilter.date.from ? currentFilter.date.from.toLocaleDateString() : 'None'} -
						{currentFilter.date.to ? currentFilter.date.to.toLocaleDateString() : 'None'}
					</P>
				</div>
				<div class="flex w-4/5 flex-col items-start justify-center gap-1 pt-2">
					{#each Object.values(RecordCategory) as category}
						<label class="label flex flex-row items-center gap-2">
							<input
								type="checkbox"
								class="checkbox"
								value={category}
								checked={currentFilter.category.includes(category)}
								onchange={() => handleCategoryChange(category)}
							/>
							<span class="text-sm text-white"
								>{category.charAt(0).toUpperCase() + category.slice(1)}</span
							>
						</label>
					{/each}
				</div>
			</GeneralCard>
		</div>
	{/if}
</div>
