<script lang="ts">
	// @ts-ignore
	import { LottiePlayer } from '@lottiefiles/svelte-lottie-player';
	import { goto } from '$app/navigation';
	import {
		isShowingSteps,
		isLoading,
		isProcessDone,
		isResendOTP,
		resetEmail
	} from '$lib/store/store';
	import ResetCountdown from '$lib/Components/Countdown/ResetCountdown.svelte';
	import { useFetchPost } from '$lib/utils/fetch';
	const SuccessLottie = '/Lotties/success.json';
	let isVerified = false;
	let isShowLottie = false;
	let inputOTP = '';

	async function handleMockStep() {
		isLoading.set(true);
		try {
			setTimeout(() => {
				isShowingSteps.set([true, false, false]);
			}, 1000);
			const res = await useFetchPost(
				{ method: 'auth_forgot-password', data: { email: $resetEmail } },
				{ withCredentials: true }
			);
			setTimeout(() => {
				isShowingSteps.set([true, true, false]);
			}, 2000);
			if (res.status === 201) {
				setTimeout(() => {
					isShowingSteps.set([true, true, true]);
				}, 3000);
				setTimeout(() => {
					isLoading.set(false);
					isShowingSteps.set([false, false, false]);
					isProcessDone.set(true);
				}, 4000);
			}
		} catch (error) {
			console.log('error', error);
		}
	}

	async function handleVerifyOTP() {
		try {
			await useFetchPost(
				{ method: 'auth_reset-password', data: { otp: inputOTP, email: $resetEmail } },
				{ withCredentials: true }
			);
			isVerified = true;
			isShowLottie = true;
			setTimeout(() => {
				isShowLottie = false;
			}, 3000);
		} catch (error) {
			console.log('error', error);
		}
	}

	function handleBackToLogin() {
		isVerified = false;
		$isProcessDone = false;
		isShowLottie = false;
		resetEmail.set('');
		goto('/auth');
	}

	async function handleResendOTP() {
		try {
			const res = await useFetchPost(
				{ method: 'auth_forgot-password', data: { email: $resetEmail } },
				{ withCredentials: true }
			);
		} catch (error) {
			console.log('error', error);
		}
		$isResendOTP = false;
	}
</script>

<div class="card bg-base-100 w-full max-w-256 min-w-64 shadow-md shadow-[#0d0f12]">
	<div class="card-body">
		{#if !$isProcessDone && !isVerified}
			<h2 class="card-title">Please enter your email to reset your password</h2>
			<form class="flex flex-col gap-8">
				<div class="flex w-full flex-col gap-4">
					<fieldset class="fieldset w-full">
						<legend class="fieldset-legend">Email</legend>
						<input type="text" class="input w-full" placeholder="Email" bind:value={$resetEmail} />
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
		{#if $isProcessDone && !isVerified}
			<h2 class="card-title">Please enter the OTP sent to your email</h2>
			<form class="flex flex-col gap-8">
				<div class="flex w-full flex-col gap-4">
					<fieldset class="fieldset w-full">
						<legend class="fieldset-legend">OTP</legend>
						<input type="text" class="input w-full" placeholder="OTP" bind:value={inputOTP} />
					</fieldset>
				</div>
				<div class="flex w-full flex-col items-center justify-center">
					<button
						type="submit"
						onclick={handleVerifyOTP}
						class="btn btn-soft w-2/3 bg-[#00ffa6cb] text-black">Verify OTP</button
					>
				</div>
				{#if $isResendOTP}
					<div class="flex w-full flex-col items-center justify-center">
						<button onclick={handleResendOTP} class="btn btn-link w-2/3 text-[#00ffa6cb]">
							Resend OTP
						</button>
					</div>
				{/if}
				{#if !$isResendOTP}
					<div class="tooltip tooltip-bottom" data-tip="Resend OTP in">
						<div class="flex w-full flex-col items-center justify-center">
							<ResetCountdown />
						</div>
					</div>
				{/if}
			</form>
		{/if}
		{#if $isProcessDone && isVerified}
			{#if isShowLottie}
				<LottiePlayer
					id="success-lottie"
					autoplay={true}
					loop={false}
					background="transparent"
					src={SuccessLottie}
				/>
			{/if}
			{#if !isShowLottie}
				<div class="flex h-full w-full flex-col items-center justify-center">
					<h2 class="card-title text-center">Please check your email for the new password</h2>
					<button onclick={handleBackToLogin} class="btn btn-soft w-2/3 bg-[#00ffa6cb] text-black">
						Back to login
					</button>
				</div>
			{/if}
		{/if}
	</div>
</div>
