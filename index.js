require('dotenv').config();
const puppeteer = require('puppeteer');
const twilio = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);
const logger = require('log4js').getLogger();
const config = require('./sniper.config');
const { waitFor } = require('./lib/utils');

logger.level = 'debug';

const messagingServiceSid = process.env.TWILIO_MSSID;
const alertNumber = process.env.ALERT_NUMBER;

const isDev = process.env.NODE_ENV === 'development';

const sendErrorAlert = async (err) => {
  await twilio.messages.create({
    messagingServiceSid,
    to: alertNumber,
    body: `Stock Sniper crashed! -  ${err.message}`,
  });
};

const sendStockAlert = async (message, items) => {
  const itemLinks = items.reduce(
    (acc, item) => acc + `${item.title} - ${item.link}\n`,
    '',
  );
  const body = `${message}\n${itemLinks}`.substring(0, 1599);
  await twilio.messages.create({
    messagingServiceSid,
    to: alertNumber,
    body,
  });
};

let runCounter = 1;

(async () => {
  const browser = await puppeteer.launch({
    headless: isDev ? false : true,
    slowMo: 250,
  });
  while (1) {
    for (const { plugin, ...options } of config) {
      await plugin({
        ...options,
        browser,
        sendStockAlert,
        sendErrorAlert,
        logger,
      });
    }
    logger.info(
      `Run ${runCounter} completed. Waiting 60 seconds before next run.`,
    );
    await waitFor(60);
    runCounter++;
  }
})();

process.on('uncaughtException', (err) => {
  sendErrorAlert(err);
  logger.fatal(err);
  process.exit(1);
});
