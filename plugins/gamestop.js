const { initPage } = require('../lib/page');

module.exports = {
  gamestopListPage,
};

async function gamestopListPage({ description, url, page }) {
  await page.goto(url);
  await initPage(page, '.product-grid');

  const inStockItems = await page.$$eval('.product-grid .product', (els) =>
    els
      .map(($el) => {
        const title = $el.querySelector('.pd-name')?.textContent;
        const link = $el.querySelector('.product-tile-link')?.href;
        const price = $el
          .querySelector('.price .actual-price')
          ?.textContent.trim();
        const inStock =
          $el.querySelector('.store-availability-msg')?.textContent.trim() !==
          'Sold out';
        return {
          title,
          price,
          inStock,
          link,
        };
      })
      .filter((item) => item.inStock),
  );

  return inStockItems;
}
