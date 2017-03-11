import R = require('ramda')
import ISerializable from './ISerializable'
import ISerializableClass from './ISerializableClass'
import ISerialized from './ISerialized'
import serializables from './serializables'

/**
 * @param classObject - An object of a class with a @Serializable decorator
 * @returns a plain object containing all the original object data plus a type
 */
export function serialize(classObject:ISerializable):ISerialized {
  const obj:Object = {}
  const keys:string[] = Object.keys(classObject)
  keys.forEach((key:string) => {
    const value:any = classObject[key]
    if (value != null) {
      // recursively serialize children from @Serializable classes
      obj[key] = isSerializable(value) ? serialize(value) : value
    }
  })
  return {
    type: classObject.constructor.name,  // The object's class name
    ...obj
  }
}

/**
 * @param obj - A plain object with a type attribute
 * @returns an object of the original @Serializable class
 */
export function deserialize(obj:ISerialized):any {
  const ser:ISerializableClass|undefined = serializables.get(obj.type)
  if (!ser) {
    console.log(serializables)
    throw new Error(obj.type + ' not found in serializables')
  }
  const constructor:ObjectConstructor = ser.bind(ser)
  const data:Object = R.omit(['type'], obj)
  const keys:string[] = Object.keys(data)
  let classObject:Object
  try {
    classObject = new constructor()  // For primative args
  } catch (TypeError) {
    try {
      classObject = new constructor({})  // For object args
    } catch (TypeError) {
      classObject = new constructor(data)  // For nested serialized object args
    }
  }
  keys.forEach((key:string) => {
    const value:any = data[key]
    // recursively deserialize children from @Serializable classes
    classObject[key] = isSerialized(value) ? deserialize(value) : value
  })
  return classObject
}

export function isSerialized(obj:ISerialized):boolean {
  return obj && !!obj.type && serializables.has(obj.type)
}

export function isSerializable(obj:Object):boolean {
  return obj && !!obj.constructor.name && serializables.has(obj.constructor.name)
}

// Mostly just for unit tests
export function getSerializables():Map<string, ISerializableClass> {
  return serializables
}