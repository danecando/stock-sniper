const { closePage, initPage } = require('../lib/page');

module.exports = {
  staplesListPage,
};

async function staplesListPage({
  description,
  url,
  browser,
  sendStockAlert,
  sendErrorAlert,
  logger,
  page,
}) {
  try {
    logger.info(`Checking for ${description} stock at Staples`);
    await page.goto(url);

    await initPage(page, '.SearchResults-UX2__searchResultsContainer');

    const inStockItems = await page.$$eval(
      '.grid__column',
      (els, url) =>
        els
          .map(($el) => {
            const $header = $el.querySelector('.standard-tile__title a');
            const title = $header?.textContent;
            const link = $header?.href;
            const price = $el.querySelector('.standard-tile__final_price')
              ?.textContent;
            const inStock =
              $el
                .querySelector('.button__secondary')
                ?.textContent.toLowerCase() === 'add';
            return {
              title,
              price,
              inStock,
              link,
            };
          })
          .filter((item) => item.inStock),
      url,
    );

    const completionMessage = `${inStockItems.length} in stock items at Staples`;
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
