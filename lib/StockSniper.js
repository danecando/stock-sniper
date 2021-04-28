const puppeteer = require('puppeteer');
const alert = require('./alert');
const { isDev, normalize, useAsync, waitFor } = require('./utils');

const mods = [
  new require('puppeteer-extra-plugin-stealth/evasions/media.codecs'),
  new require(
    'puppeteer-extra-plugin-stealth/evasions/navigator.hardwareConcurrency',
  ),
  new require('puppeteer-extra-plugin-stealth/evasions/navigator.languages'),
  new require('puppeteer-extra-plugin-stealth/evasions/navigator.permissions'),
  new require('puppeteer-extra-plugin-stealth/evasions/sourceurl'),
];

const skipCountOnFail = process.env.SKIP_COUNT_ON_FAIL;
const proxyServer = process.env.PROXY_SERVER;
const UA = process.env.USER_AGENT;
const persistCookies = process.env.PERSIST_COOKIES === 'true' ? true : false;

module.exports = class StockSniper {
  constructor(browser, page, config, logger) {
    if (arguments.length !== 4) {
      throw new Error('Cannot be called directly');
    }

    this.config = config;
    this.log = logger;
    this.run = 0;
    this.skip = config.reduce(
      (acc, plugin) => ({
        ...acc,
        [normalize(plugin.store)]: { skipsLeft: 0, skipRun: this.run },
      }),
      {},
    );
    this.browser = browser;
    this.page = page;
  }

  static async init(config, logger) {
    const args = [
      '--disable-setuid-sandbox',
      '--disable-infobars',
      `--user-agent="${UA}"`,
    ];
    if (proxyServer) {
      args.push(`--proxy-server="${proxyServer}"`);
    }

    const browser = await puppeteer.launch({
      headless: isDev() ? false : true,
      slowMo: 400,
      args,
    });
    const page = await browser.newPage();

    for (const mod of mods) {
      await mod().onPageCreated(page);
    }

    return new StockSniper(browser, page, config, logger);
  }

  start = async () => {
    this.run += 1;
    for (const { plugin: pluginFn, ...plugin } of this.config) {
      if (this._skipCount(plugin.store) > 0) {
        this._minusSkip(plugin.store);
      } else {
        try {
          this.log.info(
            `Checking for ${plugin.description} stock at ${plugin.store}`,
          );

          const inStockItems = await pluginFn({
            ...plugin,
            browser: this.browser,
            page: this.page,
            logger: this.log,
          });

          const alertMessage = `${inStockItems.length} ${plugin.description} in stock at ${plugin.store}`;
          this.log.info(alertMessage);
          if (inStockItems.length > 0) {
            await alert.stock(alertMessage, inStockItems);
          }
        } catch (err) {
          await this.screenshot(plugin);
          this.log.error(err.message || err);
          this._setSkip(plugin.store);
        }
      }
    }

    await this.page.goto('about:blank');
  };

  screenshot = async (plugin) => {
    await this.page.screenshot({
      path: `./screenshots/${plugin.store}_${
        plugin.description
      }_${Date.now()}.png`,
    });
  };

  shutdown = async () => {
    await this.page.close();
    await this.browser.close();
  };

  _skipCount(store) {
    return this.skip[normalize(store)].skipsLeft;
  }
  _setSkip(store) {
    this.skip[normalize(store)] = {
      skipsLeft: skipCountOnFail,
      skipRun: this.run,
    };
  }
  _minusSkip(store) {
    const skip = this.skip[normalize(store)];
    if (skip.skipRun !== this.run) {
      skip.skipsLeft -= 1;
      skip.skipRun = this.run;
    }
  }
};
