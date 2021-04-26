require('dotenv').config();
const puppeteer = require('puppeteer');
const twilio = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);
const logger = require('log4js').getLogger();
const config = require('./sniper.config');
const { waitFor } = require('./lib/utils');

const messagingServiceSid = process.env.TWILIO_MSSID;
const alertNumber = process.env.ALERT_NUMBER;
const proxyServer = process.env.PROXY_SERVER;
const runTimeout = process.env.RUN_TIMEOUT_SECS;
// const UA =
//   'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36';

const isDev = process.env.NODE_ENV === 'development';
logger.level = 'debug';

const sendErrorAlert = async (err) => {
  await twilio.messages.create({
    messagingServiceSid,
    to: alertNumber,
    body: `Stock Sniper crashed! -  ${err}`,
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
    slowMo: 400,
    userDataDir: './tmp',
  });
  const page = await browser.newPage();

  while (1) {
    for (const { plugin, ...options } of config) {
      await plugin({
        ...options,
        browser,
        sendStockAlert,
        logger,
        page,
      });
    }
    logger.info(
      `Run ${runCounter} completed. Waiting ${runTimeout} seconds before next run.`,
    );
    await waitFor(runTimeout);
    runCounter++;
  }

  await page.close();
})();

process.on('uncaughtException', (err) => {
  sendErrorAlert(err);
  logger.fatal(err);
  process.exit(1);
});
