<script>
	import GeneralCard from '$lib/Components/Cards/GeneralCard.svelte';
	import AuthenticatedLayout from '../../layouts/AuthenticatedLayout.svelte';
	import { isAuthenticated, user } from '$lib/store/store';
	import { useFetchPost } from '$lib/utils/fetch';

	let currentPassword = $state('');
	let newPassword = $state('');

	function handleResetPassword() {
		console.log(currentPassword, newPassword);
	}

	async function handleLogout() {
		try {
			const res = await useFetchPost({ method: 'auth_logout' });
			console.log(res);
			if (res.status === 201) {
				isAuthenticated.set(false);
				// window.location.href = '/auth';
			}
		} catch (error) {
			console.error(error);
		}
	}
</script>

<AuthenticatedLayout>
	<GeneralCard>
		<div class="flex h-full w-full flex-col items-center justify-center gap-4">
			<h1 class="text-2xl font-bold">Profile</h1>
			<fieldset class="fieldset w-full">
				<legend class="fieldset-legend">Email</legend>
				<input type="text" class="input" placeholder="Email" disabled value={$user?.email} />
			</fieldset>
			<form
				onsubmit={handleResetPassword}
				class="flex w-full flex-col items-center justify-center gap-4"
			>
				<fieldset class="fieldset w-full">
					<legend class="fieldset-legend">Current Password</legend>
					<input
						type="password"
						class="input"
						placeholder="Current Password"
						bind:value={currentPassword}
					/>
				</fieldset>
				<fieldset class="fieldset w-full">
					<legend class="fieldset-legend">New Password</legend>
					<input
						type="password"
						class="input"
						placeholder="New Password"
						bind:value={newPassword}
					/>
				</fieldset>
				<button type="submit" class="btn btn-success w-4/5 font-bold">Reset Password</button>
			</form>
			<div class="divider">Or</div>
			<button class="btn btn-error w-4/5 font-bold" onclick={handleLogout}>Logout</button>
		</div>
	</GeneralCard>
</AuthenticatedLayout>
