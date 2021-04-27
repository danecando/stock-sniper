const { initPage } = require('../lib/page');

module.exports = {
  msiListPage,
};

async function msiListPage({ description, url, logger, page }) {
  await page.goto(url);
  await initPage(page, '#product-list');

  let currentPage = 1;
  const itemPages = await page.$$eval('.pagination .page-link', (els) =>
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

    const items = await page.$$eval('#product-list .product-grid', (els) =>
      els
        .map(($el) => {
          const $header = $el.querySelector('.title');
          const link = $header?.href;
          const title = $header?.firstElementChild.textContent;
          const price = $el.querySelector('.price-new')?.textContent;
          const inStock =
            $el
              .querySelector('.add-cart-button, .add-cart-button-2')
              ?.textContent.toLowerCase() === 'add to cart';
          return {
            title,
            price,
            inStock,
            link,
          };
        })
        .filter((x) => x.inStock),
    );

    inStockItems = [...inStockItems, ...items];
    currentPage += 1;
  }

  return inStockItems;
}
