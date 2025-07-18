import axios from 'axios';
import { resolvePath } from './resolvePath';

function useFetchGet(params: any): Promise<any> {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await axios.get(
				import.meta.env.VITE_API_URL + resolvePath(params.method),
				params.data
			);
			resolve(res);
		} catch (error) {
			reject(error);
		}
	});
}

function useFetchPost(params: any): Promise<any> {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await axios.post(
				import.meta.env.VITE_API_URL + resolvePath(params.method),
				params.data
			);
			resolve(res);
		} catch (error) {
			reject(error);
		}
	});
}

export { useFetchGet, useFetchPost };
