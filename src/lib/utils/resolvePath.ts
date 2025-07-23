function resolvePath(path: string) {
	const splittedPath: string[] = path.split('_');

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
				case 'self-reset-password':
					return '/auth/self-reset-password';
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
					return '/record/paginated'; //query: /:page/:limit
				case 'get-days':
					return '/record/getDaysRecords'; //query: /:days
				case 'get-days-categories':
					return '/record/getDaysTotalByCategory'; //query: /:days
				case 'get-by-description':
					return '/record/findRecordByDescription'; //query: /:description
				default:
					return splittedPath[1];
			}
		default:
			return path;
	}
}

export { resolvePath };
