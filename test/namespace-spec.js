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
	
	describe('handler mounted', function () {
		namespace = new Namespace(pathnameList.map(pathname => {
			return path.resolve(basePath, pathname);
		}));

		it('mounted successful', function () {
			
			assert(namespace.handlerOne);
			assert(namespace.handlerTwo);
			assert(namespace.handlerThree);
			assert.equal(typeof namespace.handlerFour, 'undefined');
		});

		it('mounted generator function', function () {

			const {
				handlerTwo
			} = namespace;

			handlerTwo(null, null, function () {}).then(result => {
				assert.equal(result, 2);
			});
		});

		it('mounted async function', function () {
			const {
				handlerOne
			} = namespace;

			handlerOne(1000).then(result => {
				assert.equal(result, 3);
			});
		});
	});

	describe('register test', function () {

		it('register middleware', function () {
			namespace.$register('testHandler',function test() {
				return 1;
			});
	
			assert.equal(namespace.testHandler(), 1);
		});

		it('argument 0 exception', function () {
			try {
				namespace.$register(123);
			} catch (error) {
				assert.equal(error.message, 'A string excepted by argument 0.');
			}
		});

		it('argument 1 missing',function () {
			try {
				namespace.$register('test2');
			} catch (error) {
				assert.equal(error.message, 'Argument 1 is required');
			}
		});

		it('the type of argument 1 with exception', function () {
			try {
				namespace.$register('test2', 'function');
			} catch (error) {
				assert.equal(error.message, 'A function excepted by argument 1.');
			}
		});

		it('register exception', function () {
			try {
				namespace.$register('testHandler',function test() {
					return 2;
				});
			} catch (error) {
				assert.equal(error.message, 'This name has been registed.');
			}
		});
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

		const result = testHandler(req, resMock, () => {
			return 1;
		});

		assert.equal(result, undefined);
	});
	
	it('testParams successfully', function () {
		const req = {
			params: {
				foo: 123,
				bar: 'abc'
			}
		};

		const resMock = null;

		const testHandler = namespace.$testParams(schemas);

		let result;
		
		testHandler(req, resMock, () => {
			result = 1;
		});

		assert.equal(result, 1);
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

		const result = testHandler(req, resMock, () => {
			return 1;
		});

		assert.equal(result, undefined);
	});

	it('testQuery successfully', function () {
		const req = {
			query: {
				foo: 123,
				bar: 'abc'
			}
		};

		const resMock = null;

		const testHandler = namespace.$testQuery(schemas);

		let result;
		
		testHandler(req, resMock, () => {
			result = 1;
		});

		assert.equal(result, 1);
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

		const result = testHandler(req, resMock, () => {
			return 1;
		});

		assert.equal(result, undefined);
	});

	it('testBody successfully', function () {
		const req = {
			body: {
				foo: 123,
				bar: 'abc'
			}
		};

		const resMock = null;

		const testHandler = namespace.$testBody(schemas);

		let result;
		
		testHandler(req, resMock, () => {
			result = 1;
		});

		assert.equal(result, 1);
	});

	it('isAllowed test', function () {
		const isAllowed = namespace.$isAllowed('post');

		const req = {
			method: 'get'
		};

		const resMock = {
			status() {
				return this;
			},
			json(object) {
				assert.equal(object.Allow, 'post');
			}
		};	
		
		isAllowed(req, resMock, () => {});
	});

	it('test with default in ajv', function () {
		const testHandler = namespace.$testBody();

		const req = {
			body: {
				foo: 123,
				bar: 'abc'
			}
		};

		let result;
		
		testHandler(req, null, () => {
			result = 1;
		});

		assert.equal(result, 1);
	});
});