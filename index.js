'use strict'

/*!
 * node-logicmachine-api
 * Copyright(c) 2016 Anton Fischer <a.fschr@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies
 * @private
 */
var url = require('url')
var http = require('http')

/**
 * Create a module.
 *
 * @public
 * @param {Object}           config
 * @param {String}           config.host     default '192.168.0.10:80'
 * @param {String}           config.username default 'remote'
 * @param {String}           config.password default 'remote'
 * @param {String}           config.protocol default 'http'
 * @param {String}           config.format   default 'json'
 * @param {String}           config.apiPath  default '/cgi-bin/scada-remote/request.cgi'
 * @param {Boolean|Function} config.logger   default console.log
 * @returns {Object}
 */
module.exports = function (config) {
  config = config || {}

  var host = (config.host || '192.168.0.10:80')
  var username = (config.username || 'remote')
  var password = (config.password || 'remote')
  var protocol = (config.protocol || 'http')
  var format = (config.format || 'json')
  var apiPath = (config.apiPath || '/cgi-bin/scada-remote/request.cgi')
  var logger = (console && console.log)

  if (config.logger === false) {
    logger = function () {}
  } else if (typeof config.logger === 'function') {
    logger = config.logger
  }

  var _bindResponseFunction = function (self, callback) {
    return function (res) {
      var data = ''

      res.on('data', function (chunk) {
        data += chunk
      })

      res.on('end', function () {
        if (res.statusCode !== 200) {
          callback.apply(self, ['Responce status code: ' + res.statusCode + ' (' + data + ')'])
        } else {
          try {
            var json = JSON.parse(data.replace(/\\'/g, '\''))

            callback.apply(self, [undefined, json])
          } catch (e) {
            callback.apply(self, [e.message])
          }
        }
      })
    }
  }

  var _bindErrorFunction = function (self, callback) {
    return function (e) {
      callback.apply(self, [e])
    }
  }

  var _doRequest = function (requestUrl, callback) {
    logger('node-logicmachine-api REQUEST to: ' + requestUrl)

    return http
      .get(requestUrl, _bindResponseFunction(this, callback))
      .on('error', _bindErrorFunction(this, callback))
  }

  return {
    /**
     * Create API url
     *
     * @param {Object} query
     * @returns {String}
     */
    createUrl: function (query) {
      query = query || {}
      query.m = format

      return url.format({
        protocol: protocol,
        auth: (username + ':' + password),
        host: host,
        pathname: apiPath,
        query: query
      })
    },

    /**
     * Get last 50 alerts
     *
     * @param {Function} callback
     */
    getAlerts: function (callback) {
      var requestUrl = this.createUrl({
        r: 'alerts'
      })

      return _doRequest(requestUrl, callback)
    },

    /**
     * Get last 50 errors
     *
     * @param {Function} callback
     */
    getErrors: function (callback) {
      var requestUrl = this.createUrl({
        r: 'errors'
      })

      return _doRequest(requestUrl, callback)
    },

    /**
     * Get objects marked as 'export' sorted by last update tim
     *
     * @param {Function} callback
     */
    getObjects: function (callback) {
      var requestUrl = this.createUrl({
        r: 'objects'
      })

      return _doRequest(requestUrl, callback)
    },

    /**
     * Find object by address
     *
     * @param {String}   address '1/1/1'
     * @param {Function} callback
     */
    findObject: function (address, callback) {
      var requestUrl = this.createUrl({
        r: 'grp',
        fn: 'find',
        alias: address
      })

      return _doRequest(requestUrl, callback)
    },

    /**
     * Get object value by address
     *
     * @param {String}   address '1/1/1'
     * @param {Function} callback
     */
    getObjectValue: function (address, callback) {
      var requestUrl = this.createUrl({
        r: 'grp',
        fn: 'getvalue',
        alias: address
      })

      return _doRequest(requestUrl, callback)
    },

    /**
     * Set object value by address
     *
     * @param {String}   address '1/1/1'
     * @param {String}   value
     * @param {Function} callback
     */
    setObjectValue: function (address, value, callback) {
      var requestUrl = this.createUrl({
        r: 'grp',
        fn: 'write',
        alias: address,
        value: value
      })

      return _doRequest(requestUrl, callback)
    },

    /**
     * Set object value by address without sending message to KNX
     *
     * @param {String}   address '1/1/1'
     * @param {String}   value
     * @param {Function} callback
     */
    setObjectValueWithoutKNX: function (address, value, callback) {
      var requestUrl = this.createUrl({
        r: 'grp',
        fn: 'update',
        alias: address,
        value: value
      })

      return _doRequest(requestUrl, callback)
    },

    /**
     * Send response to KNX by object address
     *
     * @param {String}   address '1/1/1'
     * @param {String}   value
     * @param {Function} callback
     */
    sendResponseToKNXObject: function (address, value, callback) {
      var requestUrl = this.createUrl({
        r: 'grp',
        fn: 'response',
        alias: address,
        value: value
      })

      return _doRequest(requestUrl, callback)
    },

    /**
     * Send 'read' message to KNX by object address
     *
     * @param {String}   address '1/1/1'
     * @param {Function} callback
     */
    sendReadToKNXObject: function (address, callback) {
      var requestUrl = this.createUrl({
        r: 'grp',
        fn: 'read',
        alias: address
      })

      return _doRequest(requestUrl, callback)
    }
  }
}
