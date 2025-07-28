<script lang="ts">
	import { useFetchDelete } from '$lib/utils/fetch';
	import { searchPage, showToast, toastMessage, toastType, triggerSearch } from '$lib/store/store';
	const { record } = $props();
	let deleteRecordModal: HTMLDialogElement | null = null;

	async function deleteRecord() {
		try {
			const res = await useFetchDelete(
				{
					method: 'record_delete',
					query: `/${record.id}`
				},
				{ withCredentials: true }
			);
			if (res.status === 200) {
				toastMessage.set('Record deleted successfully');
				toastType.set('success');
				showToast.set(true);
				deleteRecordModal?.close();
				$triggerSearch?.($searchPage);
			}
		} catch (error) {
			console.log(error);
			toastMessage.set('Error deleting record');
			toastType.set('error');
			showToast.set(true);
		}
	}
</script>

<div class="w-4/5 max-w-128">
	<button
		class="btn btn-sm btn-error h-10 w-full font-bold"
		onclick={() => deleteRecordModal?.showModal()}>Delete</button
	>
	<dialog bind:this={deleteRecordModal} class="modal">
		<div class="modal-box text-white">
			<h3 class="text-lg font-bold">Delete record</h3>
			<p class="py-4">Are you sure you want to delete this record?</p>
			<div class="modal-action">
				<form method="dialog" class="flex w-full flex-col gap-4" onsubmit={deleteRecord}>
					<p class="text-sm">This action cannot be undone.</p>
					<button type="submit" class="btn btn-error">Delete</button>
					<button type="button" class="btn" onclick={() => deleteRecordModal?.close()}>Close</button
					>
				</form>
			</div>
		</div>
	</dialog>
</div>
