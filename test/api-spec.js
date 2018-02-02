'use strict';

const handler = require('../index');
const {remove, resolve} = handler;

const assert = require('assert');
const path = require('path');

describe.only('api test', function() {

	const pathname = path.resolve(__dirname, './assets');

	describe('resolve handler test', function() {

		it('should return an array include 3 element',function() {
			const option = {
				pathname: pathname
			};
			const resolvedList = resolve(option);

			assert.equal(resolvedList.length, 3);
			assert.equal(Array.isArray(resolvedList), true);
		});

		it('exclude',function() {
			const option = {
				pathname: pathname,
				exclude: /\one.js$/
			};
			const resolvedList = resolve(option);

			assert.equal(resolve(option).length, 2);
			assert.equal(Array.isArray(resolve(option)), true);
		});
	});

	describe('requireHanlder handler test', function() {

		it('');
		it('');
		it('');
		it('');
		it('');
	});

	describe('remove handler test', function() {

		it('',function() {})
	});
});