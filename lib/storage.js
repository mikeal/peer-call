/* global localStorage */
const EventEmitter = require('events')

class Storage extends EventEmitter {
  get (key) {
    let data = {}

    try {
      data = JSON.parse(localStorage.getItem(this.key)) || {}
    } catch (e) {
      console.warn('Could not parse localStorage', e.stack)
    }

    if (typeof key === 'undefined') {
      return data
    }

    return data[key] || null
  }

  set (key, value) {
    const data = this.get()

    if (data[key] === value) {
      return
    }

    data[key] = value

    localStorage.setItem(this.key, JSON.stringify(data))

    process.nextTick(() => {
      this.emit('change', data, this)
      this.emit(`change:${key}`, value, this)
    })
  }

  get key () {
    return 'roll-call'
  }
}

module.exports = Storage
