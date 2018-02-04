handler-loader
===============

# Introduction

This module make handlers loading easier and it can validate some data format.

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

This an object that has you loaded handlers as attributes and three prototype methods: `$testParams`,`$testQuery`,`$testBody`.These three methods use ajv schema as argument and return a handler to validate data format.

# Application Side

## ajv

Documentation: https://www.npmjs.com/package/ajv

## debug

Documentation: https://www.npmjs.com/package/debug

# Example

## CLI

npm run example