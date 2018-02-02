'use strict';

const Namespace = require('../src/namespace');

const assert = require('assert');
const path = require('path');

describe('class test', function () {

	const basePath = path.resolve(__dirname, './assets');
	const pathnameList = [
		'layer0/handler-one.js',
		'layer0/layer1/handler-three.js',
		'handler-two.js'
	];
	
	let namespace;
	
	it('handler mounted', function () {
		namespace = new Namespace(pathnameList.map(pathname => {
			return path.resolve(basePath, pathname);
		}));

		assert(namespace.handlerOne);
		assert(namespace.handlerTwo);
		assert(namespace.handlerThree);
	});

	const schemas = {
		"properties": {
			"foo": {
				type: "number"
			},
			"bar": {
				type: "string"
			}
		}
	};
	
	it('testParams with exception', function () {
		const req = {
			params: {
				foo: 'abc',
				bar: 123
			}
		};

		const resMock = {
			status() {
				return this;
			},
			json(errors) {
				assert(errors.length);
			}
		};

		const testHandler = namespace.$testParams(schemas);

		testHandler(null, req, resMock, () => {});
	});
	
	it('testParams successfully', function () {
		const req = {
			params: {
				foo: 123,
				bar: 'abc'
			}
		};

		const resMock = {
			status() {
				return this;
			},
			json(errors) {
				assert.equal(errors.length, 0);
			}
		};

		const testHandler = namespace.$testParams(schemas);

		testHandler(null, req, resMock, () => {});
	});

	it('testQuery with exception', function () {
		const req = {
			query: {
				foo: 'abc',
				bar: 123
			}
		};

		const resMock = {
			status() {
				return this;
			},
			json(errors) {
				assert(errors.length);
			}
		};

		const testHandler = namespace.$testQuery(schemas);

		testHandler(null, req, resMock, () => {});
	});

	it('testQuery successfully', function () {
		const req = {
			query: {
				foo: 123,
				bar: 'abc'
			}
		};

		const resMock = {
			status() {
				return this;
			},
			json(errors) {
				assert.equal(errors.length, 0);
			}
		};

		const testHandler = namespace.$testQuery(schemas);

		testHandler(null, req, resMock, () => {});
	});

	it('testBody with exception', function () {
		const req = {
			body: {
				foo: 'abc',
				bar: 123
			}
		};

		const resMock = {
			status() {
				return this;
			},
			json(errors) {
				assert(errors.length);
			}
		};

		const testHandler = namespace.$testBody(schemas);

		testHandler(null, req, resMock, () => {});
	});

	it('testBody successfully', function () {
		const req = {
			body: {
				foo: 123,
				bar: 'abc'
			}
		};

		const resMock = {
			status() {
				return this;
			},
			json(errors) {
				assert.equal(errors.length, 0);
			}
		};

		const testHandler = namespace.$testBody(schemas);

		testHandler(null, req, resMock, () => {});
	});
});