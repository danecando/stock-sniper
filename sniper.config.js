const {
  amdListPage,
  bbListPage,
  bhListPage,
  odListPage,
  msiListPage,
  staplesListPage,
  adoramaListPage,
  gamestopListPage,
} = require('./plugins');

module.exports = [
  {
    store: 'GameStop',
    description: 'RTX 3060 GPU',
    url: 'https://www.gamestop.com/search/?q=rtx+3060&lang=default',
    plugin: gamestopListPage,
  },
  {
    store: 'Staples',
    description: 'RTX 3060 GPU',
    url:
      'https://www.staples.com/rtx+3060/directory_rtx%25203060?fids=Department_3A_22Graphics!Cards_22',
    plugin: staplesListPage,
  },
  {
    store: 'Staples',
    description: 'RTX 3070 GPU',
    url:
      'https://www.staples.com/rtx+3070/directory_rtx%25203070?fids=Department_3A_22Graphics!Cards_22',
    plugin: staplesListPage,
  },
  {
    store: 'Staples',
    description: 'RTX 3080 GPU',
    url:
      'https://www.staples.com/rtx+3080/directory_rtx%25203080?fids=Department_3A_22Graphics!Cards_22',
    plugin: staplesListPage,
  },
  {
    store: 'Staples',
    description: 'RTX 3090 GPU',
    url:
      'https://www.staples.com/rtx+3090/directory_rtx%25203090?fids=Department_3A_22Graphics!Cards_22',
    plugin: staplesListPage,
  },
  {
    store: 'MSI Store',
    description: 'RTX 30 GPU',
    url:
      'https://us-store.msi.com/index.php?route=product/category&path=75_76_246',
    plugin: msiListPage,
  },
  {
    store: 'MSI Store',
    description: 'RX 6 GPU',
    url:
      'https://us-store.msi.com/index.php?route=product/category&path=75_77_277',
    plugin: msiListPage,
  },
  {
    store: 'GameStop',
    description: 'RTX 3070 GPU',
    url: 'https://www.gamestop.com/search/?q=rtx+3070&lang=default',
    plugin: gamestopListPage,
  },
  {
    store: 'Office Depot',
    description: 'RTX 30 GPU',
    url:
      'https://www.officedepot.com/catalog/search.do?Nty=1&Ntx=mode+matchpartialmax&Ntk=all&Ntt=pny+geforce+rtx+30&N=5&cbxRefine=1462159',
    plugin: odListPage,
  },
  {
    store: 'BH Photo',
    description: 'RTX 30 GPU',
    url:
      'https://www.bhphotovideo.com/c/products/Graphic-Cards/ci/6567/N/3668461602?filters=fct_nvidia-geforce-series_5011%3Ageforce-rtx-3060%7Cgeforce-rtx-3060-ti%7Cgeforce-rtx-3070%7Cgeforce-rtx-3080%7Cgeforce-rtx-3090',
    plugin: bhListPage,
  },
  {
    store: 'AMD Direct',
    description: 'GPU',
    url: 'https://www.amd.com/en/direct-buy/us',
    plugin: amdListPage,
  },
  {
    store: 'BestBuy',
    description: 'GPU',
    url:
      'https://www.bestbuy.com/site/computer-cards-components/video-graphics-cards/abcat0507002.c?id=abcat0507002&qp=gpusv_facet%3DGraphics%20Processing%20Unit%20(GPU)~AMD%20Radeon%20RX%206800%20XT%5Egpusv_facet%3DGraphics%20Processing%20Unit%20(GPU)~NVIDIA%20GeForce%20RTX%203060%20Ti%5Egpusv_facet%3DGraphics%20Processing%20Unit%20(GPU)~NVIDIA%20GeForce%20RTX%203070%5Egpusv_facet%3DGraphics%20Processing%20Unit%20(GPU)~NVIDIA%20GeForce%20RTX%203080',
    plugin: bbListPage,
  },
  {
    store: 'GameStop',
    description: 'RTX 3080 GPU',
    url: 'https://www.gamestop.com/search/?q=rtx+3080&lang=default',
    plugin: gamestopListPage,
  },
  {
    store: 'Adorama',
    description: 'RTX 3080 GPU',
    url:
      'https://www.adorama.com/l/Computers/Computer-Components/Video-and-Graphics-Cards/?searchinfo=rtx%203080&sel=Item-Condition_New-Items',
    plugin: adoramaListPage,
  },
];
