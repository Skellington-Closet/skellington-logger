# skellington-logger

[![Greenkeeper badge](https://badges.greenkeeper.io/Skellington-Closet/skellington-logger.svg)](https://greenkeeper.io/)
A generic logger for [Skellington](https://github.com/colestrode/skellington) and its plugins.

## About

Skellington logger is a pre-configured [Winston](https://github.com/winstonjs/winston) console logger that standardizes
logs from Skellington plugins. Each logger accepts a required `name` property that will be used in the log message
to identify which plugin logged the message.

## Usage

```
  const logger = require('skellington-logger')('my-plugin')
  
  ...
  
  logger.error('Oh nos! An errrrr!', err)
  
  ...
  
  logger.info('This is a very interesting object.', obj)
```

## Example Output

The default formatting is:

```
<LEVEL> <date> <name> <message>
<Stack trace OR meta object>
```

Logging metadata: 
```
logger.info('This is a very interesting object.', {walter: 'white', jesse: 'pinkman'})
...
NFO 2016-12-20T15:58:37.661Z my-plugin This is a very interesting object.
{
  "walter": "white",
  "jesse": "pinkman"
}

```

Logging a Stack trace: 
```
logger.error('Oh nos! An errrrr!', new Error(`Here's an error.`))
...
ERROR 2016-12-20T15:58:37.656Z my-plugin Oh no!
Error: Here's an error.
    at Object.<anonymous> (/Users/cfurfarostrode/src/personal/skellington-logger/test.js:4:24)
    at Module._compile (module.js:570:32)
    at Object.Module._extensions..js (module.js:579:10)
    at Module.load (module.js:487:32)
    at tryModuleLoad (module.js:446:12)
    at Function.Module._load (module.js:438:3)
    at Module.runMain (module.js:604:10)
    at run (bootstrap_node.js:394:7)
    at startup (bootstrap_node.js:149:9)
    at bootstrap_node.js:509:3
```

## Custom Formatters

You can pass your own formatter the first time you initialize the logger by passing a format function as the second
argument:

`const logger = require('skellington-logger')('my-plugin', (name, options) => { return '....'})`

The formatter function accepts the plugin name and Winston options object.