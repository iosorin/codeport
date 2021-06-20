import fs from 'fs';

export const write = (path: string, data: any) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(path, JSON.stringify(data), (err: unknown) => {
			if (err) reject(err);
			else resolve(data);
		});
	});
};

export const read = (path: string) => {
	return new Promise((resolve, reject) => {
		fs.readFile(path, 'utf-8', (err, content) => {
			if (err) reject(err);
			else resolve(JSON.parse(content));
		});
	});
};
