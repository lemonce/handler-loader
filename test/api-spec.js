'use strict';

const handler = require('../index');
const {remove, resolve} = handler;

const assert = require('assert');
const path = require('path');
const Ajv = require('ajv');

describe('api test', function () {

	const pathname = path.resolve(__dirname, './assets');

	describe('resolve api test', function () {

		it('should return an array include 4 element',function () {
			const option = {
				pathname: pathname
			};
			const pathnameList = resolve(option);

			assert.equal(pathnameList.length, 4);
			assert.equal(Array.isArray(pathnameList), true);

			pathnameList.forEach(pathname => {
				assert(path.isAbsolute(pathname));
			});
		});

		it('exclude test',function () {
			const option = {
				pathname: pathname,
				exclude: /\one.js$/
			};
			const pathnameList = resolve(option);

			assert.equal(pathnameList.length, 3);
			assert.equal(Array.isArray(pathnameList), true);

			pathnameList.forEach(pathname => {
				assert(path.isAbsolute(pathname));
			});
		});
	});

	describe('requireHanlder api test', function () {

		it('argument 0 test', function () {
			try {
				handler(123)
			} catch (error) {
				assert(error.message,
					'A string excepted by argument 0.');
			}
		});

		it('argument 1 test', function () {
			try {
				handler('test', {
					pathname: 123
				})
			} catch (error) {
				assert(error.message,
					'A string property pathname required by argument 1.');
			}
		});

		const ajv = new Ajv();

		const schemas = {
			"handlerOne": {
				type: "function"
			},
			"handlerTwo": {
				type: "function"
			},
			"handelerThree": {
				type: "function"
			},
			"$testParams": {
				type: "function"
			},
			"$testQuery": {
				type: "function"
			},
			"$testBody": {
				type: "function"
			}
		};

		const validate = ajv.compile(schemas);

		it('create namespace test', function () {
			const test = handler('test', {
				pathname: pathname
			});
			
			assert(validate(test));
		});

		it('repeated namespace test', function () {
			try {
				handler('test', {
					pathname: pathname
				});
			} catch (error) {
				assert(error.message,
					'This namespace is exsited.');
			}
		});

		it('query namespace test with exception', function () {
			try {
				handler('handler');
			} catch (error) {
				assert(error.message,
					'This namespace is not exsited.');
			}
		});

		it('query namespace test', function () {
			const test = handler('test');
			
			assert(validate(test));
		});
	});

	describe('remove api test', function() {

		it('remove namespace',function() {
			remove('test');

			try {
				handler('test');
			} catch (error) {
				assert(error.message,
					'This namespace is not exsited.');
			}
		})
	});
});