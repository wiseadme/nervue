module.exports = {
  markdown: {
    attrs: {
      leftDelimiter: '%{',
      rightDelimiter: '}%',
    },
  },
  title: 'Nervue',
  lang: 'en-US',
  description: 'The Vue Store that you will enjoy using',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }],

    [
      'meta',
      { name: 'wwads-cn-verify', content: '5878a7ab84fb43402106c575658472fa' },
    ],

    [
      'meta',
      {
        property: 'og:type',
        content: 'website',
      },
    ],
    [
      'meta',
      {
        property: 'og:url',
        content: 'META_URL',
      },
    ],
    [
      'meta',
      {
        property: 'og:title',
        content: 'META_TITLE',
      },
    ],
    [
      'meta',
      {
        property: 'og:description',
        content: 'META_DESCRIPTION',
      },
    ],
    [
      'meta',
      {
        property: 'og:image',
        content: 'META_IMAGE',
      },
    ],
    [
      'meta',
      {
        property: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
    [
      'meta',
      {
        property: 'twitter:url',
        content: 'META_URL',
      },
    ],
    [
      'meta',
      {
        property: 'twitter:title',
        content: 'META_TITLE',
      },
    ],
    [
      'meta',
      {
        property: 'twitter:description',
        content: 'META_DESCRIPTION',
      },
    ],
    [
      'meta',
      {
        property: 'twitter:image',
        content: 'META_IMAGE',
      },
    ],

    [
      'link',
      {
        rel: 'preload',
        href: '/dank-mono.css',
        as: 'style',
        onload: 'this.onload=null;this.rel=\'stylesheet\'',
      },
    ],

    // ...(isProduction ? productionHead : []),
  ],

  themeConfig: {
    repo: 'wiseadme/nervue',
    logo: '/logo.svg',
    docsDir: 'packages/docs',
    docsBranch: 'v2',
    editLinks: true,
    editLinkText: 'Suggest changes to this page',

    // algolia: {
    //   appId: '69Y3N7LHI2',
    //   apiKey: '45441f4b65a2f80329fd45c7cb371fea',
    //   indexName: 'nervue',
    // },
    //
    // carbonAds: {
    //   carbon: 'CEBICK3I',
    //   custom: 'CEBICK3M',
    //   placement: 'routervuejsorg',
    // },

    nav: [
      { text: 'Guide', link: '/introduction.html' },
      { text: 'API', link: '/api/' },
      { text: 'Config', link: '/config/' },
      { text: 'Plugins', link: '/plugins/' },
      {
        text: 'Links',
        items: [
          {
            text: 'Discussions',
            link: 'https://github.com/wiseadme/nervue/discussions',
          },
        ],
      },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Getting Started', link: '/getting-started' },
        ]
      }
    ]
  }
}
