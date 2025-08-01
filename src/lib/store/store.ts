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
export const previousPage = writable<number>(0);
export const showToast = writable<boolean>(false);
export const toastMessage = writable<string>('');
export const toastType = writable<string>('');
export const currency = writable<string>('NONE');

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
	category: RecordCategory.NONE,
	amount: null,
	description: '',
	date: ''
});
export const top3TimeDays = writable<number>(7);
export const currentFilter = writable<number>(0);
export const categoriesTotal = writable<{ category: string; amount: number }[]>([]);
export const totalSpent = writable<number>(0);

// /search
export interface SearchRecord {
	category: number;
	date: string;
	amount: number;
	description: string;
}

export const activeRecord = writable<number>(0);
export const searchRecords = writable<SearchRecord[]>([]);
export const searchLimit = writable<number>(5);
export const searchTotalPages = writable<number>(0);
export const searchTotalRecords = writable<number>(0);
export const searchPage = writable<number>(1);
export const triggerSearch = writable<((page: number) => Promise<void>) | null>(null);
