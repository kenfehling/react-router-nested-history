import ISerializableClass from '../ISerializableClass'
import serializables from '../serializables'

// @Serializable decorator for a class
export default function Serializable(target:ISerializableClass) {
  if (target.type) {
    serializables.set(target.type, target)  // Use the class name as a type
  }
  else {
    throw new Error(`target ${target} has no type`)
  }
}