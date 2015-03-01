# node-logicmachine-api

NodeJS API module for LogicMachine Remote services

![Logo](https://github.com/antonfisher/extjs-d3pie-chart/raw/docs/images/node-lm-api.png)

## LogicMahine Versions

Tested on v3 (LogicMachine3 Light).

## Installation

`npm install --save node-logicmachine-api`

## Methods

All methods with _callback_ will call it with _(err, data)_ params:

`err {Error|undefined}`;

`data {Object|Array|undefined}`.

Objects address format:

`1/1/1`.

|Method|Description|
|---|---|
__[required]__
| `getAlerts(callback)` | _callback {_Function_} |
|| Returns the last 50 alerts, `data:{}` |
| `getErrors(callback)` | _callback {_Function_} |
|| Returns the last 50 errors |
| `getObjects(callback)` | _callback {_Function_} |
|| Returns objects marked as _export_ sorted by last update time |
| `findObject(address, callback)` | _address {String}_; _callback {_Function_} |
|| Returns object value by address |
| `getObjectValue(address, callback)` | _address {String}_; _callback {_Function_} |
|| Returns current object value by address |
| `setObjectValue(address, value, callback)` | _address {String}_; _value {String}_; _callback {_Function_} |
|| Set object value by address |
| `setObjectValueWithoutKNX(address, value, callback)` | _address {String}_; _value {String}_; _callback {_Function_} |
|| Set object value by address without sending message to KNX |
| `sendResponseToKNXObject(address, value, callback)` | _address {String}_; _value {String}_; _callback {_Function_} |
|| Send response to KNX by object address |
| `sendReadToKNXObject(address, value, callback)` | _address {String}_; _callback {_Function_} |
|| Send _read_ message to KNX by object address |
| `createUrl(query)` | _query {Object}_ object of URL params; |
|| Create custom API url |

## Links:
* [http://evika.ru/](http://evika.ru/)

## License
Copyright (c) 2015 Anton Fischer

MIT License. Free use and change.
