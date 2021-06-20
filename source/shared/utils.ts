export const update = (list: any[], item: any, merge = false, prop = 'id') => list.map((listItem) => {
		if (listItem[prop] === item[prop]) {
			return merge ? { ...listItem, ...item } : item;
		}

		return listItem;
	});
