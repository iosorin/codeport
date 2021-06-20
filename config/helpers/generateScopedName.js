// returns the unified class name based on the class name and the path to the CSS file

// Module for generating unique names
const incstr = require('incstr');

const createUniqueIdGenerator = () => {
	const uniqIds = {};

	const generateNextId = incstr.idGenerator({
		// exclude the letter "d" to remove the ad combination, as it may be blocked
		alphabet: 'abcefghijklmnopqrstuvwxyzABCEFGHJKLMNOPQRSTUVWXYZ',
	});

	// minified name`s version
	return (name) => {
		if (!uniqIds[name]) {
			uniqIds[name] = generateNextId();
		}

		return uniqIds[name];
	};
};

const localNameIdGenerator = createUniqueIdGenerator();
const componentNameIdGenerator = createUniqueIdGenerator();

module.exports = (localName, resourcePath) => {
	// get folder name
	const componentName = resourcePath
		.replace(/\\/g, '/')
		.split('/')
		.slice(-2, -1)[0];

	const localId = localNameIdGenerator(localName);
	const componentId = componentNameIdGenerator(componentName);

	return `${componentId}_${localId}`;
};
