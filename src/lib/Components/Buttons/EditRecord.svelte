<script lang="ts">
	import { RecordCategory } from '$lib/constants/record';
	import { searchPage, showToast, toastMessage, toastType, triggerSearch } from '$lib/store/store';
	import { useFetchPut } from '$lib/utils/fetch';
	import { addDays, convertCategoryToNumber, convertNumberToCategory } from '$lib/utils/tools';
	import { Datepicker } from 'flowbite-svelte';
	const { record } = $props();
	let editRecordModal: HTMLDialogElement | null = null;
	let thisRecord = $state({
		...record,
		category: convertNumberToCategory(record.category).toLowerCase(),
		date: record.date.split('T')[0]
	});
	let availableTo = addDays(new Date());
	let selectedDate = $state(new Date(thisRecord.date));

	async function editRecord() {
		console.log(thisRecord);
		try {
			const res = await useFetchPut(
				{
					method: 'record_update',
					data: {
						...thisRecord,
						category: convertCategoryToNumber(thisRecord.category as RecordCategory),
						date: `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`
					},
					query: `/${record.id}`
				},
				{ withCredentials: true }
			);
			if (res.status === 200) {
				toastMessage.set('Record updated successfully');
				toastType.set('success');
				showToast.set(true);
				editRecordModal?.close();
				$triggerSearch?.($searchPage);
			}
		} catch (error) {
			console.log(error);
			toastMessage.set('Error updating record');
			toastType.set('error');
			showToast.set(true);
		}
	}
</script>

<div class="w-4/5 max-w-128">
	<button
		class="btn btn-sm btn-black h-10 w-full font-bold"
		onclick={() => editRecordModal?.showModal()}>Edit</button
	>
	<dialog bind:this={editRecordModal} class="modal">
		<div class="modal-box text-white">
			<h3 class="text-lg font-bold">Edit record</h3>
			<p class="py-4">Select a category and amount</p>
			<div class="modal-action">
				<form method="dialog" class="flex w-full flex-col gap-4" onsubmit={editRecord}>
					<select class="select select-neutral w-full" bind:value={thisRecord.category}>
						{#each Object.values(RecordCategory) as category}
							{#if category !== RecordCategory.NONE}
								<option value={category} selected={thisRecord.category === category}
									>{category.slice(0, 1).toUpperCase() + category.slice(1)}</option
								>
							{/if}
						{/each}
					</select>
					<label class="input w-full">
						$
						<input type="number" class="text" placeholder="Amount" bind:value={thisRecord.amount} />
					</label>
					<input
						type="text"
						class="input input-bordered w-full"
						placeholder="(Optional) Description"
						bind:value={thisRecord.description}
					/>
					<Datepicker bind:value={selectedDate} class="w-full" {availableTo} />
					<button type="submit" class="btn btn-success">Save</button>
					<button type="button" class="btn" onclick={() => editRecordModal?.close()}>Close</button>
				</form>
			</div>
		</div>
	</dialog>
</div>
