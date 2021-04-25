module.exports = {
  initPage,
  closePage,
  autoScroll,
};

async function initPage(page, selector) {
  await page.setViewport({
    width: 1200,
    height: 800,
  });
  await page.waitForSelector(selector);
}

async function closePage(page) {
  await page.goto('about:blank');
  await page.close();
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 175);
    });
  });
}
