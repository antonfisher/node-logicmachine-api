'use strict'

require('chai').should()
var logicmachineApiDefault = require('../index.js')()
var logicmachineApiCustom = require('../index.js')({
  host: '10.10.10.10:8080',
  username: 'bob',
  password: 'sponge',
  protocol: 'https',
  format: 'xml'
})

describe('#createUrl', function () {
  it('default url', function () {
    logicmachineApiDefault.createUrl().should.equal(
      'http://remote:remote@192.168.0.10:80/cgi-bin/scada-remote/request.cgi' +
      '?m=json'
    )
  })

  it('alerts url', function () {
    logicmachineApiDefault.createUrl({
      r: 'alerts'
    }).should.equal(
      'http://remote:remote@192.168.0.10:80/cgi-bin/scada-remote/request.cgi' +
      '?r=alerts&m=json'
    )
  })

  it('errors url', function () {
    logicmachineApiDefault.createUrl({
      r: 'errors'
    }).should.equal(
      'http://remote:remote@192.168.0.10:80/cgi-bin/scada-remote/request.cgi' +
      '?r=errors&m=json'
    )
  })

  it('objects url', function () {
    logicmachineApiDefault.createUrl({
      r: 'objects'
    }).should.equal(
      'http://remote:remote@192.168.0.10:80/cgi-bin/scada-remote/request.cgi' +
      '?r=objects&m=json'
    )
  })

  it('find object url', function () {
    logicmachineApiDefault.createUrl({
      r: 'grp',
      fn: 'find',
      alias: '1/1/1'
    }).should.equal(
      'http://remote:remote@192.168.0.10:80/cgi-bin/scada-remote/request.cgi' +
      '?r=grp&fn=find&alias=1%2F1%2F1&m=json'
    )
  })

  it('get value url', function () {
    logicmachineApiDefault.createUrl({
      r: 'grp',
      fn: 'getvalue',
      alias: '1/1/1'
    }).should.equal(
      'http://remote:remote@192.168.0.10:80/cgi-bin/scada-remote/request.cgi' +
      '?r=grp&fn=getvalue&alias=1%2F1%2F1&m=json'
    )
  })

  it('set value url', function () {
    logicmachineApiCustom.createUrl({
      r: 'grp',
      fn: 'write',
      alias: '1/1/1',
      value: 'test'
    }).should.equal(
      'https://bob:sponge@10.10.10.10:8080/cgi-bin/scada-remote/request.cgi' +
      '?r=grp&fn=write&alias=1%2F1%2F1&value=test&m=xml'
    )
  })

  it('update url', function () {
    logicmachineApiCustom.createUrl({
      r: 'grp',
      fn: 'update',
      alias: '1/1/1',
      value: 'test'
    }).should.equal(
      'https://bob:sponge@10.10.10.10:8080/cgi-bin/scada-remote/request.cgi' +
      '?r=grp&fn=update&alias=1%2F1%2F1&value=test&m=xml'
    )
  })

  it('response url', function () {
    logicmachineApiCustom.createUrl({
      r: 'grp',
      fn: 'response',
      alias: '1/1/1',
      value: 'test'
    }).should.equal(
      'https://bob:sponge@10.10.10.10:8080/cgi-bin/scada-remote/request.cgi' +
      '?r=grp&fn=response&alias=1%2F1%2F1&value=test&m=xml'
    )
  })

  it('read url', function () {
    logicmachineApiCustom.createUrl({
      r: 'grp',
      fn: 'read',
      alias: '1/1/1'
    }).should.equal(
      'https://bob:sponge@10.10.10.10:8080/cgi-bin/scada-remote/request.cgi' +
      '?r=grp&fn=read&alias=1%2F1%2F1&m=xml'
    )
  })
})
