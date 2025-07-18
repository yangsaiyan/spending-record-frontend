<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { isResendOTP } from '$lib/store/store';
	let seconds = $state(0);
	let minutes = $state(5);
	let interval: number;

	function handleCountdown() {
		interval = setInterval(() => {
			if (seconds > 0) {
				seconds -= 1;
			} else if (minutes > 0) {
				minutes -= 1;
				seconds = 59;
			}
		}, 1000);
	}

	$effect(() => {
		if (minutes === 0 && seconds === 0) {
			$isResendOTP = true;
		}
	});

	onMount(() => {
		handleCountdown();
	});

	onDestroy(() => {
		if (interval) {
			clearInterval(interval);
		}
	});
</script>

<span class="countdown font-mono text-2xl">
	<span style="--value:{minutes};" aria-live="polite" aria-label={minutes.toString()}
		>{minutes}</span
	>
	:
	<span style="--value:{seconds};" aria-live="polite" aria-label={seconds.toString()}
		>{seconds}</span
	>
</span>
