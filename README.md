handler-loader
===============

# Introduction

This module make handlers loading easier and it can validate some data format.

# Installation

```bash
$ npm install --save express-handler-loader
```

# Use

This module provide an interface object with two methods.

## interface object

This interface method have two arguments,and the usefuness of this interface method is different when the number of arguments changed.

### namespace(argument 0)

If you use method only with this argument,you can query namespace that created.This argument is string.

### option(argument 1)

If you use method with two arguments,you can create a new namespace.This argument is a object with attributes `pathname` and `exclude`.Pathname is the path that handlers located those will be loaded.Exclude is the condition to filter the handlers.

## resolve

This method is used to create an array include the absolute path of file.

### option(argument)

This argument is the same with the above `option`.

## remove

This method is used to delete that created.

### namespace(argument)

This argument is the same with the above `namespace`.

## namespace

This an object that has you loaded handlers as attributes and four prototype methods:`$register`,`$testParams`,`$testQuery`,`$testBody`,`$isAllowed`.These three methods use ajv schema as argument and return a handler to validate data format.

### $register

It is used to register middlewave by yourself.

### $testParams

It is used to validate the data format of req.params.

### $testQuery

It is used to validate the data format of req.query.

### $testBody

It is used to validate the data format of req.body.

### $isAllowed

It is return status 405 when the clientsend a request that not match the mappedHTTP method.

# Application Side

## ajv

Documentation: https://www.npmjs.com/package/ajv

## debug

Documentation: https://www.npmjs.com/package/debug

# Example

```bash
const loader = require('express-handler-loader');
{resolve, remove} = loader;
```
