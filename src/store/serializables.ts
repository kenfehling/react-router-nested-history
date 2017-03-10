import ISerializableClass from './ISerializableClass'

// Map to store all classes with @Serializable decorator
const serializables:Map<string, ISerializableClass> =
  new Map<string, ISerializableClass>()

export default serializables