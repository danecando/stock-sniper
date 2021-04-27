const { initPage } = require('../lib/page');

module.exports = {
  odListPage,
};

async function odListPage({ description, url, page }) {
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
        const inStock = $el.querySelector('.cart > input')?.disabled === false;
        return {
          title,
          price,
          link,
          inStock,
        };
      })
      .filter((item) => item.inStock),
  );

  return inStockItems;
}
