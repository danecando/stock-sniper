const { closePage, initPage } = require('../lib/page');

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
  page,
}) {
  try {
    logger.info(`Checking for ${description} stock at AMD Direct`);
    await page.goto(url);

    await initPage(page, '#block-amd-content');

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
  } catch (err) {
    await page.screenshot({
      path: `./screenshots/amdListPage_${description}_${Date.now()}.png`,
    });
    logger.error(`amdListPage ${description} - ${err}`);
  }
}
