'use strict';
const Namespace = require('./src/namespace');
const readdirRecursiveSync = require('./src/readdir');

const namespaceStore = {};

function excludePathname(pathnameList, exclude = /\s/) {
	return pathnameList.filter(pathname => !exclude.test(pathname));
}

/**
 * 
 * 
 * @param {string} options
 * @param {string} options.pathname
 * @param {RegExp} options.exclude
 */

function getRequireList({ pathname, exclude }) {
	const pathnameList = readdirRecursiveSync(pathname);

	return excludePathname(pathnameList, exclude);
};

/**
 * 
 * 
 * @param {string} namespace
 * @param {string} [options]
 * @param {string} options.pathname
 * @param {RegExp} options.exclude
 */

const $ = module.exports = function requireHanlder(namespace, options) {
	if (typeof namespace !== 'string') {
		throw new Error('A string excepted by argument 0.');
	}
	
	if (options) {
		
		if (!options.pathname) {
			throw new Error('A string property pathname required by argument 1.');
		}

		if (namespaceStore[namespace]) {
			throw new Error('This namespace is exsited.');
		}
		
		const pathnameList = getRequireList(options);

		namespaceStore[namespace] = new Namespace(pathnameList);
		
	} else if (!namespaceStore[namespace]) {
		throw new Error('This namespace is not exsited.');
	}

	return namespaceStore[namespace];
};

/**
 * 
 * 
 * @param {string} namespace
 */

$.remove = function destroyNamespace(namespace) {
	return delete namespaceStore[namespace];
};

$.resolve = getRequireList;