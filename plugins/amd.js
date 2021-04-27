const { initPage } = require('../lib/page');

module.exports = {
  amdListPage,
};

async function amdListPage({ description, url, page }) {
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

  return inStockItems;
}
