import axios from 'axios';

export const http = axios.create({
	timeout: 10000,
	// withCredentials: false,
	headers: { 'Access-Control-Allow-Origin': '*' },
});
