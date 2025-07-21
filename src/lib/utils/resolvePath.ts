function resolvePath(path: string) {
	switch (path) {
		case 'login':
			return '/auth/login';
		case 'register':
			return '/auth/register';
		case 'check-me':
			return '/user/me';
		case 'logout':
			return '/auth/logout';
		case 'forgot-password':
			return '/auth/forgot-password';
		case 'reset-password':
			return '/auth/reset-password';
		default:
			return path;
	}
}

export { resolvePath };
