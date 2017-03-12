import {serialize, deserialize} from '../../../src/store/serializer'
import {expect, assert} from 'chai'
import Serializable from '../../../src/store/decorators/Serializable'
import ISerialized from '../../../src/store/ISerialized'
declare const describe:any
declare const it:any

describe('serializer', () => {

  @Serializable
  class ABC {
    static readonly type: string = 'ABC'
    readonly type: string = ABC.type
    readonly x:number
    constructor(x:number) {
      this.x = x
    }
  }

  @Serializable
  class DEF {
    static readonly type: string = 'DEF'
    readonly type: string = DEF.type
    readonly x:number
    constructor({x}:{x:number}) {
      this.x = x
    }
  }

  @Serializable
  class GHI {
    static readonly type: string = 'GHI'
    readonly type: string = GHI.type
    readonly abc:ABC
    constructor(abc:ABC) {
      this.abc = abc
    }
  }

  describe('serialize', () => {
    it('creates a plain object using a simple argument', () => {
      expect(serialize(new ABC(3))).to.deep.equal({type: 'ABC', x: 3})
    })

    it('creates a plain object using an object argument', () => {
      expect(serialize(new DEF({x: 3}))).to.deep.equal({type: 'DEF', x: 3})
    })

    it('creates a plain object with a nested serializable object', () => {
      expect(serialize(new GHI(new ABC(3)))).to.deep.equal(
          {type: 'GHI', abc: {type: 'ABC', x: 3}})
    })
  })

  describe('deserialize', () => {
    it('creates a typed object using a simple argument', () => {
      const original:ABC = new ABC(3)
      const serialized:ISerialized = serialize(original)
      const deserialized:ABC = deserialize(serialized)
      expect(deserialized).to.deep.equal(original)
      assert.instanceOf(deserialized, ABC)
    })

    it('creates a typed object using an object argument', () => {
      const original:DEF = new DEF({x: 3})
      const serialized:ISerialized = serialize(original)
      const deserialized:DEF = deserialize(serialized)
      expect(deserialized).to.deep.equal(original)
      assert.instanceOf(deserialized, DEF)
    })

    it('creates a typed object with a nested serializable object', () => {
      const original:GHI = new GHI(new ABC(3))
      const serialized:ISerialized = serialize(original)
      const deserialized:GHI = deserialize(serialized)
      expect(deserialized).to.deep.equal(original)
      assert.instanceOf(deserialized, GHI)
      assert.instanceOf(deserialized.abc, ABC)
    })
  })
})