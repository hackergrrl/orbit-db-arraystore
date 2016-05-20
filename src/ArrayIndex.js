'use strict'

class ArrayIndex {
  constructor () {
    this._index = {}
  }

  get (key) {
    return this._index[key]
  }

  // TODO: these entries NEED to be sorted by id (bisecting sort)
  updateIndex (oplog, added) {
    added.reverse().reduce((handled, item) => {
      if (handled.indexOf(item.payload.key) === -1) {
        handled.push(item.payload.key)
        if (item.payload.op === 'INSERT') {
          this._index[item.payload.id] = item.payload.value
        }
      }
      return handled
    }, [])
  }
}

module.exports = ArrayIndex
