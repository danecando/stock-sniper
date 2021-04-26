const {
  amdListPage,
  bbListPage,
  bhListPage,
  odListPage,
  msiListPage,
  staplesListPage,
} = require('./plugins');

module.exports = [
  {
    description: 'RTX 3060 GPU',
    url:
      'https://www.staples.com/rtx+3060/directory_rtx%25203060?fids=Department_3A_22Graphics!Cards_22',
    plugin: staplesListPage,
  },
  {
    description: 'RTX 3070 GPU',
    url:
      'https://www.staples.com/rtx+3070/directory_rtx%25203070?fids=Department_3A_22Graphics!Cards_22',
    plugin: staplesListPage,
  },
  {
    description: 'RTX 3080 GPU',
    url:
      'https://www.staples.com/rtx+3080/directory_rtx%25203080?fids=Department_3A_22Graphics!Cards_22',
    plugin: staplesListPage,
  },
  {
    description: 'RTX 3090 GPU',
    url:
      'https://www.staples.com/rtx+3090/directory_rtx%25203090?fids=Department_3A_22Graphics!Cards_22',
    plugin: staplesListPage,
  },
  {
    description: 'RTX 30 GPU',
    url:
      'https://us-store.msi.com/index.php?route=product/category&path=75_76_246',
    plugin: msiListPage,
  },
  {
    description: 'RX 6 GPU',
    url:
      'https://us-store.msi.com/index.php?route=product/category&path=75_77_277',
    plugin: msiListPage,
  },
  {
    description: 'RTX 30 GPU',
    url:
      'https://www.officedepot.com/catalog/search.do?Nty=1&Ntx=mode+matchpartialmax&Ntk=all&Ntt=pny+geforce+rtx+30&N=5&cbxRefine=1462159',
    plugin: odListPage,
  },
  {
    description: 'RTX 30 GPU',
    url:
      'https://www.bhphotovideo.com/c/products/Graphic-Cards/ci/6567/N/3668461602?filters=fct_nvidia-geforce-series_5011%3Ageforce-rtx-3060%7Cgeforce-rtx-3060-ti%7Cgeforce-rtx-3070%7Cgeforce-rtx-3080%7Cgeforce-rtx-3090',
    plugin: bhListPage,
  },
  {
    description: 'RX 6 GPU',
    url:
      'https://www.bhphotovideo.com/c/products/Graphic-Cards/ci/6567/N/3668461602?filters=fct_amd-radeon-series_5012%3Aradeon-rx-6700-xt%7Cradeon-rx-6800%7Cradeon-rx-6800-xt%7Cradeon-rx-6900-xt',
    plugin: bhListPage,
  },
  {
    description: 'GPU',
    url: 'https://www.amd.com/en/direct-buy/us',
    plugin: amdListPage,
  },
  {
    description: 'GPU',
    url:
      'https://www.bestbuy.com/site/computer-cards-components/video-graphics-cards/abcat0507002.c?id=abcat0507002&qp=gpusv_facet%3DGraphics%20Processing%20Unit%20(GPU)~AMD%20Radeon%20RX%206700%20XT%5Egpusv_facet%3DGraphics%20Processing%20Unit%20(GPU)~AMD%20Radeon%20RX%206800%5Egpusv_facet%3DGraphics%20Processing%20Unit%20(GPU)~AMD%20Radeon%20RX%206800%20XT%5Egpusv_facet%3DGraphics%20Processing%20Unit%20(GPU)~AMD%20Radeon%20RX%206900%20XT%5Egpusv_facet%3DGraphics%20Processing%20Unit%20(GPU)~NVIDIA%20GeForce%20RTX%203060%5Egpusv_facet%3DGraphics%20Processing%20Unit%20(GPU)~NVIDIA%20GeForce%20RTX%203060%20Ti%5Egpusv_facet%3DGraphics%20Processing%20Unit%20(GPU)~NVIDIA%20GeForce%20RTX%203070%5Egpusv_facet%3DGraphics%20Processing%20Unit%20(GPU)~NVIDIA%20GeForce%20RTX%203080%5Egpusv_facet%3DGraphics%20Processing%20Unit%20(GPU)~NVIDIA%20GeForce%20RTX%203090',
    plugin: bbListPage,
  },
  // {
  //   description: 'Xbox Series X',
  //   url:
  //     'https://www.bestbuy.com/site/xbox-series-x-and-s/xbox-series-x-and-s-consoles/pcmcat1586900952752.c?id=pcmcat1586900952752',
  //   plugin: bbListPage,
  // },
  // {
  //   description: 'PS5',
  //   url:
  //     'https://www.bestbuy.com/site/playstation-5/ps5-consoles/pcmcat1587395025973.c?id=pcmcat1587395025973',
  //   plugin: bbListPage,
  // },
];
