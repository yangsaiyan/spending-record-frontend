<script>
	import { currentPage } from '$lib/store/store';
	import { getCurrentPage } from '$lib/utils/tools';
	import { onMount } from 'svelte';

	onMount(() => {
		currentPage.set(getCurrentPage(window.location.pathname));
	});
</script>

<div
	class="navbar relative m-2 !min-h-10 w-full max-w-3xl min-w-fit rounded-4xl px-0 py-0 shadow-md shadow-[#0d0f12]"
>
	<div
		class="absolute top-1/2 left-0 z-0 h-full -translate-y-1/2 rounded-4xl bg-[#00ffa6cb] transition-transform duration-300 ease-in-out"
		style="width: 33.33%; transform: translateX({$currentPage * 100}%)"
	></div>

	<a
		class="z-10 w-1/3 px-4 py-1 text-center text-lg data-[active=true]:font-bold data-[active=true]:text-black"
		data-active={$currentPage === 0}
		href="/">Home</a
	>
	<a
		class="z-10 w-1/3 px-4 py-1 text-center text-lg data-[active=true]:font-bold data-[active=true]:text-black"
		data-active={$currentPage === 1}
		href="/history">History</a
	>
	<a
		class="z-10 w-1/3 px-4 py-1 text-center text-lg data-[active=true]:font-bold data-[active=true]:text-black"
		data-active={$currentPage === 2}
		href="/profile">Profile</a
	>
</div>
