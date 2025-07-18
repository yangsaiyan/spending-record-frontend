// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module '@lottiefiles/svelte-lottie-player' {
	import { SvelteComponentTyped } from 'svelte';
	
	interface LottiePlayerProps {
		id?: string;
		autoplay?: boolean;
		loop?: boolean;
		background?: string;
		src: string;
	}

	export class LottiePlayer extends SvelteComponentTyped<LottiePlayerProps> {}
}

export {};
