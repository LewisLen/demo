const log4js = require("log4js");
const logger = log4js.getLogger("cheese");
log4js.configure({
  appenders: { cheese: { type: "file", filename: "log.txt" } },
  categories: { default: { appenders: ["cheese"], level: "error" } }
});
logger.level = 'debug';

module.exports.logger = logger