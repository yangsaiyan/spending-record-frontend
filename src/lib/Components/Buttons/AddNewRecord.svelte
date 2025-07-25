<script lang="ts">
	import { RecordCategory } from '$lib/constants/record';
	import { newRecord } from '$lib/store/store';
	import { useFetchPost } from '$lib/utils/fetch';
	import { convertCategoryToNumber } from '$lib/utils/tools';
	import { Datepicker } from 'flowbite-svelte';

	let addNewRecordModal: HTMLDialogElement | null = null;
	let isToday = $state(true);
	let monthly = $state(false);
	let selectedDate = $state(new Date());

	async function addNewRecord() {
		try {
			const res = await useFetchPost(
				{
					method: 'record_create',
					data: { ...$newRecord, category: convertCategoryToNumber($newRecord.category) }
				},
				{ withCredentials: true }
			);
			if (res.status === 201) {
				$newRecord = {
					category: null,
					amount: null,
					description: ''
				};
				addNewRecordModal?.close();
			}
		} catch (error) {
			console.log(error);
		}
	}
</script>

<div class="w-4/5 max-w-128">
	<button
		class="btn btn-success fixed right-5 bottom-5 size-16 rounded-full text-3xl font-bold opacity-70"
		onclick={() => addNewRecordModal?.showModal()}>+</button
	>
	<dialog bind:this={addNewRecordModal} class="modal">
		<div class="modal-box">
			<h3 class="text-lg font-bold">Add new record</h3>
			<p class="py-4">Select a category and amount</p>
			<div class="modal-action">
				<form method="dialog" class="flex w-full flex-col gap-4" onsubmit={addNewRecord}>
					<select class="select select-neutral w-full" bind:value={$newRecord.category}>
						<option disabled selected value={RecordCategory.NONE}>Select a category</option>
						{#each Object.values(RecordCategory) as category}
							<option value={category}
								>{category.slice(0, 1).toUpperCase() + category.slice(1)}</option
							>
						{/each}
					</select>
					<label class="input w-full">
						$
						<input type="number" class="text" placeholder="Amount" bind:value={$newRecord.amount} />
					</label>
					<input
						type="text"
						class="input input-bordered w-full"
						placeholder="(Optional) Description"
						bind:value={$newRecord.description}
					/>
					<label class="label w-full">
						<input type="checkbox" class="checkbox" bind:checked={monthly} />
						Add every month on the same day
					</label>
					<label class="label w-full">
						<input type="checkbox" class="checkbox" bind:checked={isToday} />
						Today
					</label>
					{#if !isToday}
						<Datepicker bind:value={selectedDate} class="w-full" />
					{/if}
					<button type="submit" class="btn btn-success">Add</button>
					<button type="button" class="btn" onclick={() => addNewRecordModal?.close()}>Close</button
					>
				</form>
			</div>
		</div>
	</dialog>
</div>
