'use strict';

module.exports = function paramsHandler(req, res, next) {
	console.log('paramsValidate success:' + JSON.stringify(req.params, null, '  '));
};