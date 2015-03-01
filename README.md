# node-logicmachine-api

NodeJS API module for LogicMachine Remote services

![Logo](https://raw.githubusercontent.com/antonfisher/node-logicmachine-api/docs/images/node-lm-api.png)

## LogicMahine Versions

Tested on v3 (LogicMachine3 Light).

## Installation

`npm install --save node-logicmachine-api`

## Usage

Module init params:

```javascript
var logicmachineApi = require('node-logicmachine-api')(
    host,       // default '192.168.0.10:80'
    username,   // default 'remote'
    password,   // default 'remote'
    protocol,   // default 'http'
    format,     // default 'json' ['json', 'xml', 'rss']
    apiPath     // default '/cgi-bin/scada-remote/request.cgi'
)
```

```javascript
var logicmachineApiDefault = require('node-logicmachine-api')();

logicmachineApiDefault.setObjectValue('1/1/1/', '1', function (err, data) {
    if (err) {
        console.log('Error: ' + err);
    }
    // do stuff
});
```

```javascript
var logicmachineApiCustom = require('node-logicmachine-api')('10.10.10.10:8080', 'bob', 'sponge');

logicmachineApiCustom.getObjects(function (err, data) {
    if (err) {
        console.log('Error: ' + err);
    }
    // do stuff
});
```

## Methods

All methods with _callback_ will call it with _(err, data)_ params:

`err {Error|undefined}`;

`data {Object|Array|undefined}`.

Objects address format:

`1/1/1`.

|Method|Description|
|---|---|
| `getAlerts(callback)` | callback _{Function}_ <br><br> Returns last 50 alerts |
| `getErrors(callback)` | callback _{Function}_ <br><br> Returns last 50 errors |
| `getObjects(callback)` | callback _{Function}_ <br><br> Returns objects marked as _export_ sorted by last update time |
| `findObject(address, callback)` | address _{String}_ __[required]__ <br> callback _{Function}_ <br><br> Returns object value by address |
| `getObjectValue(address, callback)` | address _{String}_ __[required]__ <br> callback _{Function}_ <br><br> Returns current object value by address |
| `setObjectValue(address, value, callback)` | address _{String}_ __[required]__ <br> value _{String}_ __[required]__ <br> callback _{Function}_ <br><br> Set object value by address |
| `setObjectValueWithoutKNX(address, value, callback)` | address _{String}_ __[required]__ <br> value _{String}_ __[required]__ <br> callback _{Function}_ <br><br> Set object value by address without sending message to KNX |
| `sendResponseToKNXObject(address, value, callback)` | address _{String}_ __[required]__ <br> value _{String}_ __[required]__ <br> callback _{Function}_ <br><br> Send response to KNX by object address |
| `sendReadToKNXObject(address, value, callback)` | address _{String}_ __[required]__ <br> callback _{Function}_ <br><br> Send _read_ message to KNX by object address |
| `createUrl(query)` | query _{Object}_ object of URL params <br><br> Create custom API url |

## Development

Run tests: `npm test`;

Run Grunt watch: `grunt watch`.

## Links:
* [http://evika.ru/](http://evika.ru/)

## License
Copyright (c) 2015 Anton Fischer

MIT License. Free use and change.
