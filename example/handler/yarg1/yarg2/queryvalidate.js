'use strict';

module.exports = function queryHandler(req, res, next) {
	console.log('queryValidate success:' + JSON.stringify(req.query, null, '  '));
};