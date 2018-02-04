'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const handlerLoader = require('../');

const pathname = path.resolve(__dirname, './handler');
const app = module.exports = express();
const example = handlerLoader('example', {
	pathname: pathname
});

app.use(bodyParser.json({ type: '*/json', limit: '32mb'}));

const paramsSchema = {
	"properties": {
		"id": {
			type: "string"
		}
	}
};
const querySchema = {
	"properties": {
		"name": {
			type: "string"
		},
		"password": {
			type: "string"
		}
	}
};
const bodySchema = {
	"properties": {
		"username": {
			type: "string"
		},
		"password": {
			type: "number"
		}
	}
};

app.listen(5000);

app.get('/:id', example.$testParams(paramsSchema), example.paramsHandler);
app.get('/', example.$testQuery(querySchema), example.queryHandler);
app.post('/', example.$testBody(bodySchema), example.bodyHandler);
