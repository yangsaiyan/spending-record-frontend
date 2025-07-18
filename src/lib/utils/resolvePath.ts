function resolvePath(path: string) {
	switch (path) {
		case 'login':
			return '/auth/login';
		case 'register':
			return '/auth/register';
		default:
			return path;
	}
}

export { resolvePath };
