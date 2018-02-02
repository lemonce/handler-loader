'use strict';

const fs = require('fs');
const path = require('path');
const debug = require('debug')('express-handler-loader:');

const JS_REG = /\.js$/;

/**
 * 
 * @param {string} pathname 
 */

function readDirectory(pathname) {
	let pathnameList = [];
	const directory = fs.readdirSync(pathname);

	directory.map(relativePathname => {
		return path.resolve(pathname, relativePathname);
	}).forEach(pathname => {
		try {
			const stats = fs.statSync(pathname);
			if (stats.isDirectory()) {
				return pathnameList = 
					pathnameList.concat(readDirectory(pathname));
			}

			if (stats.isFile() && JS_REG.test(pathname)) {
				return pathnameList.push(pathname);			
			}
		} catch (error) {

			debug(error.message);

			return;
		}
	});

	return pathnameList;
}

module.exports = readDirectory;