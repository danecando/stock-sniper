const { initPage } = require('../lib/page');

module.exports = {
  amazonItemPage,
};

async function amazonItemPage({ description, url, page }) {
  await page.goto(url);
  await initPage(page, '#ppd');

  const inStockItems = await page.$$eval('#ppd', (els) =>
    els
      .map(($el) => {
        const $itemLink = $el
          .querySelector('#productTitle')
          ?.textContent.trim();
        const title = $itemLink?.textContent;
        const link = $itemLink?.href;
        const price = $el
          .querySelector('#price_inside_buybox')
          ?.textContent.trim();
        const inStock = !!$el.querySelector('#add-to-cart-button');
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
