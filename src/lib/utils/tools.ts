import { RecordCategory } from '$lib/constants/record';
import { isAuthenticated, user } from '$lib/store/store';
import { useFetchGet } from './fetch';

export async function checkAuth() {
	try {
		const res = await useFetchGet({ method: 'user_check-auth' }, { withCredentials: true });
		if (res.status === 200) {
			isAuthenticated.set(true);
			user.set({ email: res.data.email });
			if (window.location.pathname === '/auth') window.location.href = '/';
		}
	} catch (error) {
		if (window.location.pathname !== '/auth') window.location.href = '/auth';
		isAuthenticated.set(false);
	}
}

export function getCurrentPage(path: string): number {
	if (path === '/') return 0;
	if (path === '/search') return 1;
	if (path === '/profile') return 2;
	return 0;
}

export function convertCategoryToNumber(category: RecordCategory | null): number {
	if (category === null) return 0;
	return Object.values(RecordCategory).indexOf(category);
}

export function convertNumberToCategory(number: number): string {
	if (!number || number < 0 || number === undefined) return RecordCategory.OTHER;
	return (
		Object.values(RecordCategory)[number]?.slice(0, 1).toUpperCase() +
			Object.values(RecordCategory)[number]?.slice(1) || RecordCategory.OTHER
	);
}

export function addDays(date: Date, days: number = 0): Date {
	const result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

export function dateFormat(date: Date): string {
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
