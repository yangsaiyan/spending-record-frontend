<script lang="ts">
	import { currentFilter } from '$lib/store/store';
	import { onMount } from 'svelte';

	let value = $state(0);

	$effect(() => {
		currentFilter.set(value);
	});

	onMount(() => {
		const storedValue = localStorage.getItem('listFilter');
		if (storedValue) {
			value = Number(storedValue);
		} else {
			value = 0;
		}
	});

	function handleChange(event: Event) {
		const target = event.target as HTMLInputElement;
		value = Number(target.value);
		localStorage.setItem('listFilter', value.toString());
	}
</script>

<div class="filter">
	<input
		class="btn filter-reset"
		type="radio"
		value="0"
		name="tab"
		aria-label="All"
		checked={value === 0}
		onchange={handleChange}
	/>
	<input
		class="btn"
		type="radio"
		value="1"
		name="tab"
		aria-label="Records"
		checked={value === 1}
		onchange={handleChange}
	/>
	<input
		class="btn"
		type="radio"
		value="2"
		name="tab"
		aria-label="Stat"
		checked={value === 2}
		onchange={handleChange}
	/>
	<!-- <input class="btn" type="radio" name="" aria-label=""/> -->
</div>
