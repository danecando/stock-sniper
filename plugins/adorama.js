const { initPage } = require('../lib/page');

module.exports = {
  adoramaListPage,
};

async function adoramaListPage({ description, url, page }) {
  await page.goto(url);
  await initPage(page, '.item-list');

  const inStockItems = await page.$$eval('.item-list .item', (els) =>
    els
      .map(($el) => {
        const $itemLink = $el.querySelector('.item-details h2 a');
        const title = $itemLink?.textContent;
        const link = $itemLink?.href;
        const price = $el.querySelector('.prices .your-price')?.textContent;
        const inStock =
          $el.querySelector('form button')?.dataset.action === 'addToCart';
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
