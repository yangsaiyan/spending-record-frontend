<script lang="ts">
	import AuthenticatedLayout from '../../layouts/AuthenticatedLayout.svelte';
	import SearchBar from '$lib/Components/SearchBar.svelte';
	import RecordList from '$lib/Components/Collapse/RecordList.svelte';
</script>

<AuthenticatedLayout>
	<SearchBar />
	<div class="flex h-full w-full flex-col items-center justify-center">
		<RecordList />
	</div>
</AuthenticatedLayout>
