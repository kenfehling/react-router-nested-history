import ISerializable from './ISerializable'

// For internal use. All class objects automatically ahdhere to this interface.

interface ISerializableClass {
  type: string
  new (...args: any[]): ISerializable
  bind: Function
}

export default ISerializableClass