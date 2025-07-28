<script lang="ts">
	import { authTab } from '$lib/store/store';
	//utils
	import { useFetchPost } from '$lib/utils/fetch';

	let formData = $state({
		email: '',
		password: ''
	});
	let isLoading = $state(false);

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		formData[target.name as keyof typeof formData] = target.value;
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if ($authTab === 0) {
			try {
				isLoading = true;
				const res = await useFetchPost(
					{ method: 'auth_login', data: formData },
					{ withCredentials: true }
				);
				if (res.status === 201 && res.data.message === 'Logged in') {
					window.location.href = '/';
				}
			} catch (error) {
				console.log(error);
			}
			isLoading = false;
		} else {
			try {
				isLoading = true;
				const res = await useFetchPost(
					{ method: 'auth_register', data: formData },
					{ withCredentials: true }
				);
				if (res.status === 201 && res.data.message === 'User registered') {
					window.location.href = '/';
				}
			} catch (error) {
				console.log(error);
			}
			isLoading = false;
		}
	}
</script>

<div class="card bg-base-100 w-full max-w-256 min-w-64 shadow-md shadow-[#0d0f12]">
	<div class="card-body">
		<h2 class="card-title">
			{$authTab === 0 ? 'Login' : 'Register'}
		</h2>
		<form onsubmit={handleSubmit} class="flex flex-col gap-8">
			<div class="flex w-full flex-col gap-4">
				<fieldset class="fieldset w-full">
					<legend class="fieldset-legend">Email</legend>
					<input
						type="text"
						class="input w-full"
						placeholder="Email"
						bind:value={formData.email}
						oninput={handleInput}
					/>
				</fieldset>
				<fieldset class="fieldset w-full">
					<legend class="fieldset-legend">Password</legend>
					<input
						type="password"
						class="input w-full"
						placeholder="Password"
						bind:value={formData.password}
						oninput={handleInput}
					/>
				</fieldset>
			</div>
			<div class="flex w-full flex-col items-center justify-center">
				<button
					type="submit"
					class="btn btn-soft w-2/3 bg-[#00ffa6cb] text-black"
					disabled={isLoading}
				>
					{#if isLoading}
						<span class="loading loading-spinner loading-sm"></span>
					{:else}
						{$authTab === 0 ? 'Login' : 'Register'}
					{/if}
				</button>
				{#if $authTab === 0}
					<div class="tooltip" data-tip="Click me to reset password">
						<a class="link" href="/auth/reset">Forgot Password?</a>
					</div>
				{/if}
			</div>
		</form>
	</div>
</div>
