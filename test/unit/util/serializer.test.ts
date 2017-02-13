import {
  Serializable,
  getSerializables, serialize, deserialize, ISerialized
} from '../../../src/util/serializer'
declare const describe:any
declare const it:any
declare const expect:any
declare const beforeEach: any;
declare const afterEach:any

describe('serializer', () => {

  @Serializable
  class ABC {
    readonly x:number
    constructor(x:number) {
      this.x = x
    }
  }

  @Serializable
  class DEF {
    readonly x:number
    constructor({x}:{x:number}) {
      this.x = x
    }
  }

  @Serializable
  class GHI {
    readonly abc:ABC
    constructor(abc:ABC) {
      this.abc = abc
    }
  }

  describe('@Serialize', () => {
    it('adds deocrated class to a list', () => {
      expect(getSerializables().size).toBe(3)
    })
  })

  describe('serialize', () => {
    it('creates a plain object using a simple argument', () => {
      expect(serialize(new ABC(3))).toEqual({type: 'ABC', x: 3})
    })

    it('creates a plain object using an object argument', () => {
      expect(serialize(new DEF({x: 3}))).toEqual({type: 'DEF', x: 3})
    })

    it('creates a plain object with a nested serializable object', () => {
      expect(serialize(new GHI(new ABC(3)))).toEqual(
          {type: 'GHI', abc: {type: 'ABC', x: 3}})
    })
  })

  describe('deserialize', () => {
    it('creates a typed object using a simple argument', () => {
      const original:ABC = new ABC(3)
      const serialized:ISerialized = serialize(original)
      const deserialized:ABC = deserialize(serialized)
      expect(deserialized).toEqual(original)
      expect(deserialized).toBeInstanceOf(ABC)
    })

    it('creates a typed object using an object argument', () => {
      const original:DEF = new DEF({x: 3})
      const serialized:ISerialized = serialize(original)
      const deserialized:DEF = deserialize(serialized)
      expect(deserialized).toEqual(original)
      expect(deserialized).toBeInstanceOf(DEF)
    })

    it('creates a typed object with a nested serializable object', () => {
      const original:GHI = new GHI(new ABC(3))
      const serialized:ISerialized = serialize(original)
      const deserialized:GHI = deserialize(serialized)
      expect(deserialized).toEqual(original)
      expect(deserialized).toBeInstanceOf(GHI)
      expect(deserialized.abc).toBeInstanceOf(ABC)
    })
  })
})