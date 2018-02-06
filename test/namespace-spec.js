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

			const result = handlerTwo(null, null, function () {}).constructor.name;

			assert.equal(result, 'Promise');
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

		it('register a Generator function', function () {
			namespace.$register('generator', function* test(req, res, next) {
				next();
			});

			const result = namespace.generator(null, null, function () {}).constructor.name;

			assert.equal(result, 'Promise');
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
});