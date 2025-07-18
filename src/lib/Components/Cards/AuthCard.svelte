<script lang="ts">
	import { authTab } from '$lib/store/store';
	//utils
	import { useFetchPost } from '$lib/utils/fetch';

	async function handleSubmit(e: Event) {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);

		if ($authTab === 0) {
			try {
				const res = await useFetchPost({ method: 'login', data: formData });
				console.log(res);
			} catch (error) {
				console.log(error);
			}
		} else {
			try {
				const res = await useFetchPost({ method: 'register', data: formData });
				console.log(res);
			} catch (error) {
				console.log(error);
			}
		}
	}
</script>

<div class="card bg-base-100 w-full max-w-256 min-w-64 shadow-md shadow-[#0d0f12]">
	<div class="card-body">
		<h2 class="card-title">
			{$authTab === 0 ? 'Login' : 'Register'}
		</h2>
		<form on:submit={handleSubmit} class="flex flex-col gap-8">
			<div class="flex w-full flex-col gap-4">
				<fieldset class="fieldset w-full">
					<legend class="fieldset-legend">Email</legend>
					<input type="text" class="input w-full" placeholder="Email" />
				</fieldset>
				<fieldset class="fieldset w-full">
					<legend class="fieldset-legend">Password</legend>
					<input type="text" class="input w-full" placeholder="Password" />
				</fieldset>
			</div>
			<div class="flex w-full flex-col items-center justify-center">
				<button type="submit" class="btn btn-soft w-2/3 bg-[#00ffa6cb] text-black"
					>{$authTab === 0 ? 'Login' : 'Register'}</button
				>
				<div class="tooltip" data-tip="Click me to reset password">
					<a class="link" href="/auth/reset">Forgot Password?</a>
				</div>
			</div>
		</form>
	</div>
</div>
