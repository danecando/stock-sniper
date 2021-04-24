const { closePage } = require('../lib/page');

module.exports = {
  amdListPage,
};

async function amdListPage({
  description,
  url,
  browser,
  sendStockAlert,
  sendErrorAlert,
  logger,
}) {
  const page = await browser.newPage();
  try {
    logger.info(`Checking for ${description} stock at AMD Direct`);
    await page.goto(url);

    logger.debug('Waiting for page to load');
    await page.waitForSelector('#block-amd-content');

    const inStockItems = await page.$$eval(
      '.view-content .views-row',
      (els, url) =>
        els
          .map(($el) => {
            const title = $el.querySelector('.shop-title')?.textContent.trim();
            const isCPU = title && title.toLowerCase().indexOf('ryzen') !== -1;
            const price = $el.querySelector('.shop-price')?.textContent.trim();
            const inStock =
              $el.querySelector('.shop-links')?.textContent.trim() !==
              'Out of Stock';
            return {
              title,
              isCPU,
              price,
              inStock,
              link: url,
            };
          })
          .filter((item) => !item.isCPU && item.inStock),
      url,
    );

    const completionMessage = `${inStockItems.length} in stock items at AMD Direct`;
    logger.info(completionMessage);

    if (inStockItems.length > 0) {
      sendStockAlert(completionMessage, inStockItems);
    }

    await closePage(page);
  } catch (err) {
    const errMsg = `amdListPage ${description} - ${err}`;
    logger.error(errMsg);
    sendErrorAlert(errMsg);
    await closePage(page);
  }
}
