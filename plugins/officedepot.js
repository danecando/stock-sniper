const { closePage, initPage } = require('../lib/page');

module.exports = {
  odListPage,
};

async function odListPage({
  description,
  url,
  browser,
  sendStockAlert,
  sendErrorAlert,
  logger,
}) {
  const page = await browser.newPage();
  try {
    logger.info(`Checking for ${description} stock at Office Depot`);
    await page.goto(url);

    await initPage(page, '#productView');

    const inStockItems = await page.$$eval('#productView .sku_item', (els) =>
      els
        .map(($el) => {
          const $header = $el.querySelector('.desc_text a');
          const title = $header?.textContent;
          const link = $header?.href;
          const price = $el
            .querySelector('.price_column.right')
            ?.textContent.trim();
          const inStock =
            $el.querySelector('.cart > input')?.disabled === false;
          return {
            title,
            price,
            inStock,
            link,
          };
        })
        .filter((item) => item.inStock),
    );

    const completionMessage = `${inStockItems.length} in stock items at Office Depot`;
    logger.info(completionMessage);

    if (inStockItems.length > 0) {
      sendStockAlert(completionMessage, inStockItems);
    }

    await closePage(page);
  } catch (err) {
    await page.screenshot({
      path: `./screenshots/odListPage_${description}_${Date.now()}.png`,
    });

    const errMsg = `odListPage ${description} - ${err}`;
    logger.error(errMsg);
    sendErrorAlert(errMsg);
    await closePage(page);
  }
}
