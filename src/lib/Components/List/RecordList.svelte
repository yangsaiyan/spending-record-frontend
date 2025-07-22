<script lang="ts">
	import { onMount } from 'svelte';
	import { useFetchGet } from '$lib/utils/fetch';
	import { convertNumberToCategory } from '$lib/utils/tools';

	let records: any[] = [];
	let page = 1;
	let limit = 2;
	let total: number | null = null;
	let isEnd: boolean = false;

	onMount(async () => {
		await load();
	});

	async function load() {
		if (total === records.length) {
			isEnd = true;
			return;
		}
		try {
			const res = await useFetchGet(
				{ method: 'record_get-pagination', data: { page, limit } },
				{ withCredentials: true },
				`/${page}/${limit}`
			);
			if (res.status === 200) {
				records = [...records, ...res.data.records];
				total = res.data.total;
				page++;
			}
		} catch (error) {
			console.log(error);
		}
	}

	let sentinel: HTMLElement | null = null;
	let observer: IntersectionObserver | null = null;

	$: {
		if (sentinel) {
			observer?.disconnect();
			observer = new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) load();
			});
			observer.observe(sentinel);
		}
		console.log(records);
	}
</script>

<ul class="list bg-base-100 rounded-box max-h-[200px] w-full overflow-y-auto shadow-md">
	{#each records as record}
		<li class="list-row h-fit flex justify-between">
			<div class="flex flex-col gap-2">
				<p>
					{convertNumberToCategory(record.category)?.slice(0, 1).toUpperCase() +
						convertNumberToCategory(record.category)?.slice(1)}
				</p>
				<p>{record.createdAt.split('T')[0]}</p>
			</div>
			<div class="flex flex-col gap-2">
				<p class="text-end">${record.amount}</p>
				<p class="text-end">{record.description}</p>
			</div>
		</li>
		{#if records[records.length - 1] === record && !isEnd}
			<li bind:this={sentinel} class="list-row flex min-h-16 w-full items-center justify-center">
				<div class="skeleton h-full min-w-64"></div>
			</li>
		{/if}
	{/each}
</ul>
