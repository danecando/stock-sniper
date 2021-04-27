const { initPage } = require('../lib/page');

module.exports = {
  staplesListPage,
};

async function staplesListPage({ description, url, page }) {
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

  return inStockItems;
}
