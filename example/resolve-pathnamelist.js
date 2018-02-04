'use strict';

const path = require('path');

const handlerLoader = require('../');
const {resolve} = handlerLoader;

const pathname = path.resolve(__dirname, './handler');

const pathnameList = resolve({
	pathname: pathname,
	exclude: /\queryvalidate.js$/
});

console.log('The length of pathnameList:' + pathnameList.length);