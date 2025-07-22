import { isAuthenticated } from '$lib/store/store';
import { useFetchGet } from './fetch';

export async function checkAuth() {
	try {
		const res = await useFetchGet({ method: 'check-auth' }, { withCredentials: true });
		if (res.status === 200) {
			isAuthenticated.set(true);
			if (window.location.pathname === '/auth') window.location.href = '/';
		}
	} catch (error) {
		isAuthenticated.set(false);
		window.location.href = '/auth';
	}
}

export function getCurrentPage(path: string): number {
	if (path === '/') return 0;
	if (path === '/history') return 1;
	if (path === '/profile') return 2;
	return 0;
}
