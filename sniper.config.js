const { amdListPage, bbListPage, bhPhotoList } = require('./plugins');

module.exports = [
  {
    description: 'RTX 30 GPU',
    url:
      'https://www.bhphotovideo.com/c/products/Graphic-Cards/ci/6567/N/3668461602?filters=fct_nvidia-geforce-series_5011%3Ageforce-rtx-3060%7Cgeforce-rtx-3060-ti%7Cgeforce-rtx-3070%7Cgeforce-rtx-3080%7Cgeforce-rtx-3090',
    plugin: bhPhotoList,
  },
  {
    description: 'RX 60 GPU',
    url:
      'https://www.bhphotovideo.com/c/products/Graphic-Cards/ci/6567/N/3668461602?filters=fct_amd-radeon-series_5012%3Aradeon-rx-6700-xt%7Cradeon-rx-6800%7Cradeon-rx-6800-xt%7Cradeon-rx-6900-xt',
    plugin: bhPhotoList,
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
  {
    description: 'Xbox Series X',
    url:
      'https://www.bestbuy.com/site/xbox-series-x-and-s/xbox-series-x-and-s-consoles/pcmcat1586900952752.c?id=pcmcat1586900952752',
    plugin: bbListPage,
  },
  {
    description: 'PS5',
    url:
      'https://www.bestbuy.com/site/playstation-5/ps5-consoles/pcmcat1587395025973.c?id=pcmcat1587395025973',
    plugin: bbListPage,
  },
];
