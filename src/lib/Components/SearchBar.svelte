<script lang="ts">
	import { RecordCategory } from '$lib/constants/record';
	import GeneralCard from './Cards/GeneralCard.svelte';
	import { Datepicker, P } from 'flowbite-svelte';

	let dateRange: { from: Date | undefined; to: Date | undefined } = $state({
		from: undefined,
		to: undefined
	});

	$effect(() => {
		console.log(dateRange.from);
		console.log(dateRange.to);
	});
</script>

<div class="flex w-full flex-col items-center justify-center pt-2">
	<label class="input w-4/5 rounded-full">
		<input type="search" class="grow" placeholder="Search" />
		<kbd class="kbd kbd-sm">
			<svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<g
					stroke-linejoin="round"
					stroke-linecap="round"
					stroke-width="2.5"
					fill="none"
					stroke="currentColor"
				>
					<circle cx="11" cy="11" r="8"></circle>
					<path d="m21 21-4.3-4.3"></path>
				</g>
			</svg>
		</kbd>
	</label>
	<GeneralCard>
		<div class="md:w-1/2">
			<Datepicker range bind:rangeFrom={dateRange.from} bind:rangeTo={dateRange.to} color="pink" />
			<P class="mt-4 text-white">
				Selected range:
				{dateRange.from ? dateRange.from.toLocaleDateString() : 'None'} -
				{dateRange.to ? dateRange.to.toLocaleDateString() : 'None'}
			</P>
		</div>
		<div class="flex w-4/5 flex-col items-start justify-center gap-2 pt-4">
			{#each Object.values(RecordCategory) as category}
				<label class="label flex flex-row items-center gap-2">
					<input type="checkbox" class="checkbox" value={category} />
					<span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
				</label>
			{/each}
		</div>
	</GeneralCard>
</div>

<style>
</style>
