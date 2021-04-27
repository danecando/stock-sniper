const { initPage } = require('../lib/page');

module.exports = {
  bhListPage,
};

async function bhListPage({ description, url, logger, page }) {
  await page.goto(url);
  await initPage(page, '#listingRootSection');

  let currentPage = 1;
  const itemPages = await page.$$eval(
    '[data-selenium="listingPagingList"] [data-selenium="listingPagingLink"]',
    (els) =>
      els
        .map(($link) => {
          return {
            page: parseInt($link.textContent),
            url: $link.href,
          };
        })
        .filter((x) => !isNaN(x.page)),
  );

  let inStockItems = [];
  while (currentPage <= itemPages.length) {
    logger.debug(`Scanning page ${currentPage} of ${itemPages.length}`);

    if (currentPage != 1) {
      await page.goto(itemPages.find((x) => x.page === currentPage).url);
    }

    await page.waitForTimeout(3000);

    const items = await page.$$eval(
      '[data-selenium="miniProductPage"]',
      (els) =>
        els
          .map(($el) => {
            const $header = $el.querySelector(
              '[data-selenium="miniProductPageProductNameLink"]',
            );
            const title = $header?.textContent;
            const link = $header?.href;
            const price = $el.querySelector(
              '[data-selenium="uppedDecimalPriceFirst"]',
            )?.textContent;
            const inStock =
              $el
                .querySelector('[data-selenium="addToCartButton"]')
                ?.textContent.toLowerCase() === 'add to cart';
            return {
              title,
              link,
              price,
              inStock,
            };
          })
          .filter((x) => x.inStock),
    );

    inStockItems = [...inStockItems, ...items];
    currentPage += 1;
  }

  return inStockItems;
}
