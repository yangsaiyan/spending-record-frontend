<script lang="ts">
	import { authTab } from '$lib/store/store';

	function handleTabChange(tab: number) {
		authTab.set(tab);
	}
</script>

<div class="tabs tabs-box relative flex w-full flex-row p-0">
	<div
		class="absolute top-0 left-0 h-full rounded-lg bg-[#00ffa6cb] transition-transform duration-300 ease-in-out"
		style="width: 50%; transform: translateX({$authTab * 100}%)"
	></div>
	
	<input
		type="radio"
		name="auth_tabs"
		class="tab z-10 w-1/2 flex-grow !bg-transparent !shadow-none transition-all duration-300"
		class:text-black={$authTab === 0}
		class:font-semibold={$authTab === 0}
		aria-label="Login"
		checked={$authTab === 0}
		on:change={() => handleTabChange(0)}
	/>
	<input
		type="radio"
		name="auth_tabs"
		class="tab z-10 w-1/2 flex-grow !bg-transparent !shadow-none transition-all duration-300"
		class:text-black={$authTab === 1}
		class:font-semibold={$authTab === 1}
		aria-label="Register"
		checked={$authTab === 1}
		on:change={() => handleTabChange(1)}
	/>
</div>
