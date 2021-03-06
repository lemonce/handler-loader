'use strict';
const Ajv = require('ajv');
const wrap = require('co-express');

function registerHandler(handlerPathname, namespace) {
	const handler = require(handlerPathname);

	if (typeof handler !== 'function') {
		return;
	}

	if (handler.constructor.name === 'GeneratorFunction') {
		namespace[handler.name] = wrap(handler);
	} else {
		namespace[handler.name] = handler;
	}
}

function ValidateHandlerFactory(schemas, property) {
	const ajv = new Ajv({ useDefaults: true });
	const validate = ajv.compile(schemas);

	return function validateHandler(req, res, next) {

		if (!validate(req[property])) {
			res.status(400).json(validate.errors);

			return;
		}

		next();
	};

}

module.exports = class Namespace {
	/**
	 * 
	 * @param {Array} pathnameList 
	 * @param {string} schemas
	 */
	
	constructor(pathnameList) {
		pathnameList.forEach(pathname => {
			registerHandler(pathname, this);
		});
	}

	/**
	 * 
	 * @param {string} name
	 */

	$register(name, middleware) {

		if (typeof name !== 'string') {
			throw new Error('A string excepted by argument 0.');
		}

		if (middleware) {
			if (this[name]) {
				throw new Error('This name has been registed.');
			}

			if (typeof middleware !== 'function') {
				throw new Error('A function excepted by argument 1.');
			}

			this[name] = middleware;
		} else {
			throw new Error('Argument 1 is required');
		}

	}

	/**
	 * 
	 * @param {string} schemas
	 */

	$testParams(schemas) {
		return ValidateHandlerFactory(schemas, 'params');
	}

	/**
	 * 
	 * @param {string} schemas
	 */

	$testQuery(schemas) {
		return ValidateHandlerFactory(schemas, 'query');
	}

	/**
	 * 
	 * @param {string} schemas
	 */

	$testBody(schemas) {
		return ValidateHandlerFactory(schemas, 'body');
	}

	/**
	 * 
	 * @param {string} methodName
	 */

	$isAllowed(methodName) {
		return function (req, res, next) {
			if (req.method.toLowerCase() !== methodName) {
				res.status(405).json({
					Allow: methodName
				});
			}
			
			next();
		}
	}
}