<script>
	import AuthenticatedLayout from '../layouts/AuthenticatedLayout.svelte';
	import DaySelect from '$lib/Components/Select/DaySelect.svelte';
	import Top3Amount from '$lib/Components/RadialProgress/Top3Amount.svelte';
	import AddNewRecord from '$lib/Components/Buttons/AddNewRecord.svelte';
	import RecordList from '$lib/Components/List/RecordList.svelte';
	import ListFilter from '$lib/Components/Filter/ListFilter.svelte';
	import { currentFilter, isLoading } from '$lib/store/store';
	import StatList from '$lib/Components/List/StatList.svelte';
	import FullLoading from '$lib/Components/Loading/FullLoading.svelte';
</script>

<AuthenticatedLayout>
	<div class="flex h-full w-full flex-col items-center justify-start gap-4 sm:justify-center">
		<div class="card glass flex h-full w-9/10 flex-col items-center justify-center gap-2">
			<div class="card-body w-full">
				<DaySelect />
				<Top3Amount />
			</div>
		</div>
		<div class="card glass flex h-full w-9/10 flex-col items-center justify-center gap-2">
			<div class="card-body h-full max-h-[300px] w-full overflow-y-scroll">
				<ListFilter />
				{#if $currentFilter === 1}
					<RecordList />
				{:else if $currentFilter === 2}
					<StatList />
				{/if}
			</div>
		</div>
		<AddNewRecord />
		{#if $isLoading}
			<FullLoading />
		{/if}
	</div>
</AuthenticatedLayout>
