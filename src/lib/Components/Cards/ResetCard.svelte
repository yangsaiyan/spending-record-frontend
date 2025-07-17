<script lang="ts">
	import { isShowingSteps, isLoading, isProcessDone } from '$lib/store/store';

	function handleMockStep() {
		isLoading.set(true);
		setTimeout(() => {
			for (let i = 0; i < $isShowingSteps.length; i++) {
				setTimeout(() => {
					isShowingSteps.update((arr) => {
						const copy = [...arr];
						copy[i] = true;
						return copy;
					});
				}, 1000 * i);
			}
			setTimeout(() => {
				$isLoading = false;
				$isProcessDone = true;
			}, 4000);
		}, 1000);
		isShowingSteps.set([false, false, false]);
	}
</script>

<div class="card bg-base-100 w-full max-w-256 min-w-64 shadow-md shadow-[#0d0f12]">
	<div class="card-body">
		{#if !$isProcessDone}
			<h2 class="card-title">Please enter your email to reset your password</h2>
			<form class="flex flex-col gap-8">
				<div class="flex w-full flex-col gap-4">
					<fieldset class="fieldset w-full">
						<legend class="fieldset-legend">Email</legend>
						<input type="text" class="input w-full" placeholder="Email" />
					</fieldset>
				</div>
				<div class="flex w-full flex-col items-center justify-center">
					<button
						type="submit"
						onclick={handleMockStep}
						class="btn btn-soft w-2/3 bg-[#00ffa6cb] text-black">Reset Password</button
					>
				</div>
			</form>
		{/if}
		{#if $isProcessDone}
			<h2 class="card-title">Please enter the OTP sent to your email</h2>
			<form class="flex flex-col gap-8">
				<div class="flex w-full flex-col gap-4">
					<fieldset class="fieldset w-full">
						<legend class="fieldset-legend">OTP</legend>
						<input type="text" class="input w-full" placeholder="OTP" />
					</fieldset>
				</div>
				<div class="flex w-full flex-col items-center justify-center">
					<button
						type="submit"
						onclick={handleMockStep}
						class="btn btn-soft w-2/3 bg-[#00ffa6cb] text-black">Verify OTP</button
					>
				</div>
			</form>
		{/if}
	</div>
</div>
