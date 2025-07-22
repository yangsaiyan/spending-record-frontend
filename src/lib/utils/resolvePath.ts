function resolvePath(path: string) {
	const splittedPath: string[] = path.split('_');

	console.log(splittedPath);

	switch (splittedPath[0]) {
		// /auth
		case 'auth':
			switch (splittedPath[1]) {
				case 'login':
					return '/auth/login';
				case 'register':
					return '/auth/register';
				case 'logout':
					return '/auth/logout';
				case 'forgot-password':
					return '/auth/forgot-password';
				case 'reset-password':
					return '/auth/reset-password';
				default:
					return splittedPath[1];
			}
		// /user
		case 'user':
			switch (splittedPath[1]) {
				case 'check-auth':
					return '/user/me';
				default:
					return splittedPath[1];
			}
		// /record
		case 'record':
			switch (splittedPath[1]) {
				case 'create':
					return '/record/create';
				case 'update':
					return '/record/update/:id';
				case 'delete':
					return '/record/delete/:id';
				case 'get-all':
					return '/record/getAll';
				case 'get-pagination':
					return '/record/paginated';
				case 'get-days':
					return 'getDaysRecords/:days';
				case 'get-days-categories':
					return '/record/getDaysTotalByCategory/:days';
				case 'get-by-description':
					return '/record/findRecordByDescription/:description';
				default:
					return splittedPath[1];
			}
		default:
			return path;
	}
}

export { resolvePath };
