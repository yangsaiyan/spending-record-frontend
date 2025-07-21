import { writable } from 'svelte/store';

// {GLOBAL}
export const isLoading = writable<boolean>(false);
export const isProcessDone = writable<boolean>(false);

// /auth
// default 0 = login
// 0 = login, 1 = register
export const authTab = writable<number>(0);

// /auth/reset
export const resetEmail = writable<string>('');
export const isShowingSteps = writable<boolean[]>([false, false, false]);
export const isResendOTP = writable<boolean>(false);