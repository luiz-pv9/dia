const JSONUtils = require('../../src/json/json-utils')
const expect = require('chai').expect

describe('JSONUtils specs', () => {
  describe('.fetch', () => {
    it('root key', () => {
      let value = JSONUtils.fetch({foo: 'bar'}, 'foo')
      expect(value).to.eq('bar')

      value = JSONUtils.fetch({foo: 'bar'}, 'qux')
      expect(value).to.eq(undefined)
    })

    it('nested key', () => {
      let obj = { foo: { qux: { bar: 'fizz' } } }
      let value = JSONUtils.fetch(obj, 'foo.qux.bar')
      expect(value).to.eq('fizz')
    })

    it('nested object', () => {
      let obj = { user: { name: 'Luiz Paulo' } }
      let value = JSONUtils.fetch(obj, 'user')
      expect(value).to.eql({name: 'Luiz Paulo'})
    })

    it('non existing nested key', () => {
      let obj = { foo: { qux: { bar: 'fizz' } } }
      let value = JSONUtils.fetch(obj, 'foo.buzz.bar')
      expect(value).to.eq(undefined)
    })
  })

  describe('.shallowMerge', () => {
    it('overwrites the first', () => {
      let merge = JSONUtils.shallowMerge({a: 10, b: 10}, {b: 20, c: 20})
      expect(merge).to.eql({a: 10, b: 20, c: 20})
    })
  })
})