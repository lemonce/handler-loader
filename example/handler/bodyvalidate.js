'use strict';

module.exports = function bodyHandler(req, res, next) {
	console.log('bodyValidate success: ' + JSON.stringify(req.body, null, '  '));
};