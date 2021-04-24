const { amdListPage, bbListPage } = require('./plugins');

module.exports = [
  {
    description: 'GPU',
    url: 'https://www.amd.com/en/direct-buy/us',
    plugin: amdListPage,
  },
  {
    description: 'GPU',
    url:
      'https://www.bestbuy.com/site/computer-cards-components/video-graphics-cards/abcat0507002.c?id=abcat0507002&qp=gpusv_facet%3DGraphics%20Processing%20Unit%20(GPU)~AMD%20Radeon%20RX%206700%20XT%5Egpusv_facet%3DGraphics%20Processing%20Unit%20(GPU)~AMD%20Radeon%20RX%206800%5Egpusv_facet%3DGraphics%20Processing%20Unit%20(GPU)~AMD%20Radeon%20RX%206800%20XT%5Egpusv_facet%3DGraphics%20Processing%20Unit%20(GPU)~AMD%20Radeon%20RX%206900%20XT%5Egpusv_facet%3DGraphics%20Processing%20Unit%20(GPU)~NVIDIA%20GeForce%20RTX%203060%5Egpusv_facet%3DGraphics%20Processing%20Unit%20(GPU)~NVIDIA%20GeForce%20RTX%203060%20Ti%5Egpusv_facet%3DGraphics%20Processing%20Unit%20(GPU)~NVIDIA%20GeForce%20RTX%203070%5Egpusv_facet%3DGraphics%20Processing%20Unit%20(GPU)~NVIDIA%20GeForce%20RTX%203080%5Egpusv_facet%3DGraphics%20Processing%20Unit%20(GPU)~NVIDIA%20GeForce%20RTX%203090%5Esoldout_facet%3DAvailability~Exclude%20Out%20of%20Stock%20Items',
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
