<script lang="ts">
	import { onMount } from 'svelte';
	import { useFetchGet } from '$lib/utils/fetch';
	import { convertNumberToCategory } from '$lib/utils/tools';
	import DeactivateMontlyRecord from '$lib/Components/Buttons/DeactivateMontlyRecord.svelte';
	import { currency } from '$lib/store/store';
	let records: any[] = [];

	onMount(async () => {
		await load();
	});

	async function load() {
		try {
			const res = await useFetchGet(
				{ method: 'record_get-monthly-records' },
				{ withCredentials: true }
			);
			if (res.status === 200) {
				records = res.data;
			}
		} catch (error) {
			console.log(error);
		}
	}
</script>

<ul class="list bg-base-100 rounded-box scrollbar-hide h-full w-full overflow-y-auto shadow-md">
	{#if records.length === 0}
		<div class="skeleton bg-base-900 h-full w-full"></div>
	{/if}
	{#each records as record}
		<li class="list-row flex h-fit w-full flex-col justify-between">
			<div class="flex flex-row justify-between gap-2">
				<div class="flex flex-col gap-2">
					<p>
						{convertNumberToCategory(record.category)?.slice(0, 1).toUpperCase() +
							convertNumberToCategory(record.category)?.slice(1)}
					</p>
					<p>Every month {new Date(record.createdAt).getDate()}</p>
				</div>
				<div class="flex flex-col gap-2">
					<p class="text-end">
						{$currency}
						{record.amount}
					</p>
					<p class="text-end">{record.description}</p>
				</div>
			</div>
			<div class="flex w-full flex-row justify-center">
				<DeactivateMontlyRecord {record} {load} />
			</div>
		</li>
	{/each}
</ul>
