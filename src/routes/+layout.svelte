<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import { useFetchGet } from '$lib/utils/fetch';

	let { children } = $props();

	onMount(async () => {
		const res = await useFetchGet({ method: 'check-me' }, { withCredentials: true });
		console.log(res);
		// if (res.status === 200) {
		// 	window.location.href = '/auto';
		// }
	});
</script>

{@render children()}
