'use strict';

const readdir = require('../src/readdir');

const assert = require('assert');
const path = require('path');

describe('readdir test', function () {

	const pathname = path.resolve(__dirname, './assets');

	console.log(pathname);
	it('return pathnameList', function () {

		const pathnameList = readdir(pathname);

		assert.equal(pathnameList.length, 3);

		pathnameList.forEach(pathname => {
			assert(path.isAbsolute(pathname));
		});
	});
});