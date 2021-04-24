const { autoScroll, closePage, initPage } = require('../lib/page');

module.exports = {
  bbListPage,
};

async function bbListPage({
  description,
  url,
  browser,
  sendStockAlert,
  sendErrorAlert,
  logger,
}) {
  const page = await browser.newPage();
  try {
    logger.info(`Checking for ${description} stock at Best Buy`);
    await page.goto(url);
    await initPage(page, '.shop-sku-list');

    const itemCount = await page.$$eval(
      'span.item-count',
      (els) => els[0]?.textContent,
    );

    let [currentPage, pageCount, pageLinks] = await page.$$eval(
      'ol.paging-list',
      (els, currentUrl) => {
        const $pagingList = els[0];
        if (!$pagingList) {
          return [1, 1, { 1: currentUrl }];
        }
        const pageCount = parseInt($pagingList.childElementCount);
        const currentPage = parseInt(
          $pagingList.querySelector('.current-page-number').textContent,
        );
        const pageLinks = Array.from(
          $pagingList.querySelectorAll('.page-item a'),
        ).reduce((acc, $el) => ({ ...acc, [$el.textContent]: $el.href }), {});
        return [currentPage, pageCount, pageLinks];
      },
      url,
    );

    let inStockItems = [];

    while (currentPage <= pageCount) {
      logger.debug(
        `Scanning page ${currentPage} of ${pageCount}. ${itemCount}`,
      );

      if (currentPage != 1) {
        await page.goto(pageLinks[currentPage]);
      }

      await page.waitForTimeout(5000);
      await autoScroll(page);

      const items = await page.$$eval('li.sku-item', (els) => {
        return els
          .map(($el) => {
            const $header = $el.querySelector('.sku-header a, .sku-title a');
            const title = $header?.textContent;
            const link = $header?.href;
            const price = $el.querySelector('.priceView-customer-price')
              ?.firstChild.textContent;
            const buttonText = $el
              .querySelector('.fulfillment-add-to-cart-button button')
              ?.textContent.toLowerCase()
              .trim();
            return {
              title,
              link,
              price,
              available:
                buttonText === 'add to cart' || buttonText === 'pre-order',
            };
          })
          .filter((x) => x.available);
      });

      inStockItems = [...inStockItems, ...items];
      currentPage += 1;
    }

    const completionMessage = `${inStockItems.length} in stock items at Best Buy`;
    logger.info(completionMessage);

    if (inStockItems.length > 0) {
      sendStockAlert(completionMessage, inStockItems);
    }

    await closePage(page);
  } catch (err) {
    await page.screenshot({
      path: `../screenshots/bbListPage_${description}_${Date.now()}.png`,
    });
    const errMsg = `bbListPage ${description} - ${err}`;
    logger.error(errMsg);
    sendErrorAlert(errMsg);
    await closePage(page);
  }
}
