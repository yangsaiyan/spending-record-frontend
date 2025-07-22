import { RecordCategory, type Record } from '$lib/constants/record';
import { writable } from 'svelte/store';

// {GLOBAL}
export interface User {
	email: string;
}

export const isAuthenticated = writable<boolean>(false);
export const user = writable<User | null>(null);
export const isLoading = writable<boolean>(false);
export const isProcessDone = writable<boolean>(false);
export const currentPage = writable<number>(0);

// /auth
// default 0 = login
// 0 = login, 1 = register
export const authTab = writable<number>(0);

// /auth/reset
export const resetEmail = writable<string>('');
export const isShowingSteps = writable<boolean[]>([false, false, false]);
export const isResendOTP = writable<boolean>(false);

// /index
export const newRecord = writable<Record>({
	category: null,
	amount: null,
	description: '',
});