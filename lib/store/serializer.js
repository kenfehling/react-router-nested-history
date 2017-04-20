"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var omit = require("lodash.omit");
var serializables_1 = require("./serializables");
/**
 * @param classObject - An object of a class with a @Serializable decorator
 * @returns a plain object containing all the original object data plus a type
 */
function serialize(classObject) {
    var obj = {};
    var keys = Object.keys(classObject);
    keys.forEach(function (key) {
        var value = classObject[key];
        if (value != null) {
            // recursively serialize children from @Serializable classes
            obj[key] = isSerializable(value) ? serialize(value) : value;
        }
    });
    return __assign({ type: classObject.constructor.name }, obj);
}
exports.serialize = serialize;
/**
 * @param obj - A plain object with a type attribute
 * @returns an object of the original @Serializable class
 */
function deserialize(obj) {
    var ser = serializables_1.default.get(obj.type);
    if (!ser) {
        console.log(serializables_1.default);
        throw new Error(obj.type + ' not found in serializables');
    }
    var constructor = ser.bind(ser);
    var data = omit(obj, ['type']);
    var keys = Object.keys(data);
    var classObject;
    try {
        classObject = new constructor(); // For primative args
    }
    catch (TypeError) {
        try {
            classObject = new constructor({}); // For object args
        }
        catch (TypeError) {
            classObject = new constructor(data); // For nested serialized object args
        }
    }
    keys.forEach(function (key) {
        var value = data[key];
        // recursively deserialize children from @Serializable classes
        classObject[key] = isSerialized(value) ? deserialize(value) : value;
    });
    return classObject;
}
exports.deserialize = deserialize;
function isSerialized(obj) {
    return obj && !!obj.type && serializables_1.default.has(obj.type);
}
exports.isSerialized = isSerialized;
function isSerializable(obj) {
    return obj && !!obj.constructor.name && serializables_1.default.has(obj.constructor.name);
}
exports.isSerializable = isSerializable;
//# sourceMappingURL=serializer.js.map