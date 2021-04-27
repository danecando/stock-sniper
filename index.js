require('dotenv').config();
const logger = require('log4js').getLogger();
const config = require('./sniper.config');
const alert = require('./lib/alert');
const { waitFor, runForever, isDev } = require('./lib/utils');
const StockSniper = require('./lib/StockSniper');

if (isDev) {
  logger.level = 'debug';
}

const runTimeout = process.env.RUN_TIMEOUT_SECS;

StockSniper.init(config, logger).then(async (stockSniper) => {
  process.on('uncaughtException', async (err) => {
    logger.fatal(err);
    await alert.error(err);
    await stockSniper.shutdown();
    process.exit(1);
  });

  await runForever(async () => {
    await stockSniper.start();
    logger.info(
      `Run ${stockSniper.run} completed. Waiting ${runTimeout} seconds before next run.`,
    );
    await waitFor(runTimeout);
  });
});
