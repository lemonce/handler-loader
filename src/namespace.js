'use strict';
const ajv = require('ajv');

function registerHandler(handlerPathname, namespace) {
	const handler = require(handlerPathname);

	if (typeof handler !== 'function') {
		return;
	}

	namespace[handler.name] = handler;
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
		const validate = ajv.compile(schemas);

		return function (err, req, res, next) {

			if (!validate(req.params)) {
				res.status(400).json(validate.errors);
			}

			next();
		}
	}

	/**
	 * 
	 * @param {string} schemas
	 */

	$testQuery(schemas) {
		const validate = ajv.compile(schemas);

		return function (err, req, res, next) {

			if (!validate(req.query)) {
				res.status(400).json(validate.errors);
			}

			next();
		}
	}

	/**
	 * 
	 * @param {string} schemas
	 */

	$testBody(schemas) {
		const validate = ajv.compile(schemas);

		return function (err, req, res, next) {

			if (!validate(req.body)) {
				res.status(400).json(validate.errors);
			}

			next();
		}
	}
}