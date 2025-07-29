import { currency } from "$lib/store/store";

export function init() {
	const currencyValue = localStorage.getItem('currency');
	if (currencyValue) {
		currency.set(currencyValue as string);
	}
}