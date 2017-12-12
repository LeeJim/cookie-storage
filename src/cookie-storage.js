/*
  Compatible Client Data Storage
 */

;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(function() {
      return factory()
    })
  } else if (typeof exports === 'object') {
    module.exports = factory
  } else {
    root.jStorage = factory()
  }
})(this, function (){
  var useStroage = false

  if (localStorage && localStorage.setItem) {
    useStroage = true
  }

  if (useStroage) {
    var ownProp = Object.hasOwnProperty

    var JStorage = function () {}

    JStorage.prototype.init = function() {
      var cookies = document.cookie.split('; ')
      var len = cookies.length

      for (var i = 0; i < len; i++) {
        var rect = cookies[i].split('=')
        this[rect[0]] = rect[1]
      }
      this.length = 0
    }

    JStorage.prototype.getItem = function(key) {
      for (var attr in this) {
        if (ownProp.call(this, attr)) {
          if (key === attr) {
            return this[key]
          }
        }
      }
      return null
    }

    JStorage.prototype.setItem = function(key, value) {
      var encodedValue = encodeURIComponent(value)
      var exp = new Date()
      exp.setTime(exp.getTime() + 30 * 24 * 3600) // 30天有效期
      document.cookie = `${key}=${encodedValue}; expires=${exp.toGMTString()}`
      this[key] = encodedValue
      JStorage.length++
    }

    JStorage.prototype.removeItem = function(key) {
      var bingo = document.cookie.indexOf(`; ${key}=`) > -1
      if (bingo) {
        document.cookie = `${key}=${encodedValue}; expires=${new Date().toGMTString()}`
        delete this[key]
        JStorage.length--
      }
    }

    JStorage.prototype.clear = function() {
      for (var attr in this) {
        if (ownProp.call(this, attr)) {
          document.cookie = `${attr}=${this[attr]}; expires=${new Date().toGMTString()}`
          delete this[attr]
        }
      }
    }

    var storage = new JStorage()
    storage.init()
    return storage
  }

  return localStorage
})
