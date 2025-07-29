<script>
	import ProfileAuthCard from '$lib/Components/Cards/ProfileAuthCard.svelte';
	import { onMount } from 'svelte';

	let currency = $state('NONE');

	async function handleChangeCurrency() {
		localStorage.setItem('currency', currency);
	}

	onMount(() => {
		currency = localStorage.getItem('currency') || 'NONE';
	});
</script>

<div class="join join-vertical bg-base-100 w-full">
	<div class="collapse-arrow join-item border-base-300 collapse w-full border">
		<input type="radio" name="my-accordion-4" checked />
		<div class="collapse-title font-semibold">Preferences</div>
		<div class="collapse-content text-sm">
			<div class="flex flex-col gap-2">
				<p>Currency</p>
				<select
					class="select select-bordered"
					bind:value={currency}
					onchange={handleChangeCurrency}
				>
					<option value="NONE">$</option>
					<option value="MYR">MYR</option>
					<option value="USD">USD</option>
					<option value="EUR">EUR</option>
					<option value="GBP">GBP</option>
					<option value="JPY">JPY</option>
					<option value="KRW">KRW</option>
					<option value="CNY">CNY</option>
					<option value="INR">INR</option>
					<option value="BRL">BRL</option>
					<option value="MXN">MXN</option>
					<option value="ARS">ARS</option>
					<option value="CLP">CLP</option>
					<option value="COP">COP</option>
					<option value="PEN">PEN</option>
					<option value="NZD">NZD</option>
				</select>
			</div>
		</div>
	</div>
	<div class="collapse-arrow join-item border-base-300 collapse w-full border">
		<input type="radio" name="my-accordion-4" />
		<div class="collapse-title font-semibold">Change Password & Logout</div>
		<div class="collapse-content flex justify-center text-sm">
			<ProfileAuthCard />
		</div>
	</div>
</div>
