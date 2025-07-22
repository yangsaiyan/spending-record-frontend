<script>
	import AuthenticatedLayout from '../layouts/AuthenticatedLayout.svelte';
	import GeneralCard from '$lib/Components/Cards/GeneralCard.svelte';
	import DaySelect from '$lib/Components/Select/DaySelect.svelte';
	import Top3Amount from '$lib/Components/RadialProgress/Top3Amount.svelte';
	import AddNewRecord from '$lib/Components/Buttons/AddNewRecord.svelte';
	import RecordList from '$lib/Components/List/RecordList.svelte';
	import ListFilter from '$lib/Components/Filter/ListFilter.svelte';
</script>

<AuthenticatedLayout>
	<div class="flex h-full w-full flex-col items-center justify-center gap-4">
		<GeneralCard>
			<DaySelect />
			<Top3Amount />
		</GeneralCard>
		<GeneralCard>
			<ListFilter />
			<RecordList />
		</GeneralCard>
		<AddNewRecord />
	</div>
</AuthenticatedLayout>
