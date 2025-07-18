function resolvePath(path: string) {
	switch (path) {
		case 'login':
			return '/auth/login';
		case 'register':
			return '/auth/register';
		case 'me':
			return '/user/me';
		default:
			return path;
	}
}

export { resolvePath };
