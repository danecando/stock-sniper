require('dotenv').config();
const logger = require('log4js').getLogger();
const config = require('./sniper.config');
const alert = require('./lib/alert');
const { runForever, isDev } = require('./lib/utils');
const StockSniper = require('./lib/StockSniper');

if (isDev) {
  logger.level = 'debug';
}

StockSniper.init(config, logger).then(async (stockSniper) => {
  process.on('uncaughtException', async (err) => {
    logger.fatal(err);
    await alert.error(err);
    await stockSniper.shutdown();
    process.exit(1);
  });

  await runForever(async () => {
    await stockSniper.start();
  });
});
