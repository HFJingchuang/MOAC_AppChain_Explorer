/**
 * Built-in Log Configuration
 * (sails.config.log)
 *
 * Configure the log level for your app, as well as the transport
 * (Underneath the covers, Sails uses Winston for logging, which
 * allows for some pretty neat custom transports/adapters for log messages)
 *
 * For more information on the Sails logger, check out:
 * https://sailsjs.com/docs/concepts/logging
 */

var winston = require('winston');
var path = require('path')
require('winston-daily-rotate-file');
var dateformat = require('dateformat');

// silly, debug, verbose, info, warn, error
var level = "verbose";
var filename = path.resolve(__dirname, "../logs/log");
var filesize = "1000000";
var filecount = "100";

var timestampFn = function () {
  var now = new Date();
  return dateformat(now, "yyyy-mm-dd HH:MM:ss");
};

var logger = new winston.Logger({
  level: level,
  transports: [
    new winston.transports.Console({
      prettyPrint: true,
      colorize: true,
      timestamp: timestampFn,
      handleExceptions: true
    }),
    new winston.transports.DailyRotateFile({
      filename: filename,
      datePattern: '.yyyy-MM-dd.log',
      timestamp: timestampFn,
      maxsize: filesize,
      maxFiles: filecount,
      json: false
    })
  ]
});

module.exports.log = {

  /***************************************************************************
  *                                                                          *
  * Valid `level` configs: i.e. the minimum log level to capture with        *
  * sails.log.*()                                                            *
  *                                                                          *
  * The order of precedence for log levels from lowest to highest is:        *
  * silly, verbose, info, debug, warn, error                                 *
  *                                                                          *
  * You may also set the level to "silent" to suppress all logs.             *
  *                                                                          *
  ***************************************************************************/

  // Pass in our custom logger, and pass all log levels through.
  custom: logger,
  level: level,

  // Disable captain's log so it doesn't prefix or stringify our meta data.
  inspect: false

};
