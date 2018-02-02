'use strict';
const Ajv = require('ajv');

function registerHandler(handlerPathname, namespace) {
	const handler = require(handlerPathname);

	if (typeof handler !== 'function') {
		return;
	}

	namespace[handler.name] = handler;
}

function ValidateHandlerFactory(schemas, property) {
	const ajv = new Ajv();
	const validate = ajv.compile(schemas);

	return function validateHandler(err, req, res, next) {

		if (!validate(req[property])) {
			res.status(400).json(validate.errors);
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
}