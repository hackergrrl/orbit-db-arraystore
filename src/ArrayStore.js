'use strict'

const Store = require('orbit-db-store')
const ArrayIndex = require('./ArrayIndex')

class ArrayStore extends Store {
  constructor (ipfs, id, dbname, options) {
    if (!options) options = {}
    if (!options.Index) Object.assign(options, { Index: ArrayIndex })
    super(ipfs, id, dbname, options)
  }

  get (id) {
    return this._index.get(id)
  }

  insert (data, before, after) {
    // TODO: deduce id
    var id = ''
    return this._addOperation({
      op: 'INSERT',
      // TODO: can these be any values I want? (or must be key, value)
      // TODO: let before/after have defaults
      value: data,
      id: id,
      before: before,
      after: after
    })
  }
}

module.exports = ArrayStore
