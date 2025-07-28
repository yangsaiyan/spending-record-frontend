<script>
	import { showToast, toastMessage, toastType } from '$lib/store/store';

	$: {
		if ($showToast) {
			setTimeout(() => {
				showToast.set(false);
				toastMessage.set('');
				toastType.set('');
			}, 2000);
		}
	}
</script>

{#if $showToast}
	{#if $toastType === 'success'}
		<div class="toast toast-top toast-end z-50">
			<div class="alert alert-success">
				<span>{$toastMessage}</span>
			</div>
		</div>
	{:else if $toastType === 'error'}
		<div class="toast toast-top toast-end z-50">
			<div class="alert alert-error">
				<span>{$toastMessage}</span>
			</div>
		</div>
	{:else}
		<div class="toast toast-top toast-end z-50">
			<div class="alert alert-info">
				<span>{$toastMessage}</span>
			</div>
		</div>
	{/if}
{/if}
