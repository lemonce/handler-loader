'use strict';

const handler = require('../index');
const {remove, resolve} = handler;

const assert = require('assert');

describe('manage handler test', function() {

	describe('resolve handler test', function() {

		it('should return an array include 3 element',function() {
			const option = {pathname:'./test/handler'};
			const resolvedList = resolve(option);

			assert.equal(resolvedList.length, 3);
			assert.equal(Array.isArray(resolvedList), true);
		});

		it('exclude',function() {
			const option = {
				pathname:'./test/handler',
				exclude:/\one.js$/
			};
			const resolvedList = resolve(option);

			assert.equal(resolve(option).length, 2);
			assert.equal(Array.isArray(resolve(option)), true);
		});
	});

	describe('get handler test', function() {

		it('it should return an object')
	});

	describe('remove handler test', function() {

		it('',function() {})
	});
});