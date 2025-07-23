<script>
	import AuthenticatedLayout from '../layouts/AuthenticatedLayout.svelte';
	import GeneralCard from '$lib/Components/Cards/GeneralCard.svelte';
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
	<div class="flex h-full w-full flex-col items-center justify-center gap-4">
		<GeneralCard>
			<DaySelect />
			<Top3Amount />
		</GeneralCard>
		<GeneralCard>
			<ListFilter />
			{#if $currentFilter === 1}
				<RecordList />
			{:else if $currentFilter === 2}
				<StatList />
			{/if}
		</GeneralCard>
		<AddNewRecord />
	</div>
	{#if $isLoading}
		<FullLoading />
	{/if}
</AuthenticatedLayout>
