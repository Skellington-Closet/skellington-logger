'use strict'

const winston = require('winston')
const loggers = new Set()

// log levels: error, warn, info, verbose, debug, silly
module.exports = (name, customFormatter) => {
  if (!loggers.has(name)) {
    winston.loggers.add(name, newLogger(name, customFormatter))
    loggers.add(name)
  }
  return winston.loggers.get(name)
}

function newLogger (name, customFormatter) {
  customFormatter = customFormatter || defaultFormatter

  return {
    console: {
      name: name,
      formatter: (options) => customFormatter(name, options)
    }
  }
}

// default formatter: plugin-name LEVEL timestamp message
function defaultFormatter (name, options) {
  // Return string will be passed to logger.
  let message = (options.message ? options.message : '')
  const now = new Date().toISOString()

  // if meta is an error, print error stack, else pretty print meta as JSON
  if (options.meta) {
    if (options.meta.stack) {
      const stack = options.meta.stack
      message += `\n${stack.join ? stack.join('\n') : stack}`
    } else if (Object.keys(options.meta).length) {
      message += `\n${JSON.stringify(options.meta, null, 2)}`
    }
  }

  return `${name} ${options.level.toUpperCase()} ${now} ${message}`
}
