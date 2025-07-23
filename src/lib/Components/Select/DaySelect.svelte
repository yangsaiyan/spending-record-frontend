<script lang="ts">
	import { top3TimeDays } from '$lib/store/store';
	import { onMount } from 'svelte';
	let value = $state(0);

	$effect(() => {
		top3TimeDays.set(value);
	});

	onMount(() => {
		const storedValue = localStorage.getItem('top3Days');
		if (storedValue) {
			value = Number(storedValue);
		} else {
			value = 7;
		}
	});

	function handleChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		value = Number(target.value);
		localStorage.setItem('top3Days', value.toString());
	}
</script>

<select class="select select-neutral" bind:value onchange={handleChange}>
	<option disabled selected onclick={(e) => e.preventDefault()}>Please select</option>
	<option value={7}>7 days</option>
	<option value={30}>30 days</option>
	<option value={60}>60 days</option>
	<option value={90}>90 days</option>
	<option value={180}>180 days</option>
	<option value={365}>365 days</option>
</select>
