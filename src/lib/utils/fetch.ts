import axios from 'axios';
import { resolvePath } from './resolvePath';

axios.defaults.withCredentials = true;

function useFetchGet(params: any, options?: any): Promise<any> {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await axios.get(
				import.meta.env.VITE_API_URL +
					resolvePath(params.method) +
					(params.query ? params.query : ''),
				{
					params: params.data,
					...options
				}
			);
			resolve(res);
		} catch (error) {
			reject(error);
		}
	});
}

function useFetchPost(params: any, options?: any): Promise<any> {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await axios.post(
				import.meta.env.VITE_API_URL +
					resolvePath(params.method) +
					(params.query ? params.query : ''),
				params.data,
				options
			);
			resolve(res);
		} catch (error) {
			reject(error);
		}
	});
}

function useFetchDelete(params: any, options?: any): Promise<any> {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await axios.delete(
				import.meta.env.VITE_API_URL +
					resolvePath(params.method) +
					(params.query ? params.query : ''),
				options
			);
			resolve(res);
		} catch (error) {
			reject(error);
		}
	});
}

function useFetchPut(params: any, options?: any): Promise<any> {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await axios.put(
				import.meta.env.VITE_API_URL +
					resolvePath(params.method) +
					(params.query ? params.query : ''),
				params.data,
				options
			);
			resolve(res);
		} catch (error) {
			reject(error);
		}
	});
}

export { useFetchGet, useFetchPost, useFetchDelete, useFetchPut };
