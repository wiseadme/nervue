export default {
  '/en/api/': [
    {
      text: 'api',
      items: [
        { text: 'Index', link: '/guide/' },
        { text: 'One', link: '/api/one' },
        { text: 'Two', link: '/api/two' }
      ]
    }
  ],
  '/en/': [
    {
      text: 'Introduction',
      collapsible: true,
      collapsed: true,
      items: [
        { text: 'Nervue', link: '/introduction.html' },
      ]
    },
    {
      text: 'Main concepts',
      items: [
        { text: 'Store', link: '/core-concepts/index.html' },
        { text: 'State', link: '/core-concepts/state.html' },
        { text: 'Guards', link: '/core-concepts/guards.html' },
        { text: 'Actions', link: '/core-concepts/actions.html' },
      ],
    },
    {
      text: 'Config',
      items: [
        { text: 'Index', link: '/config/' },
        { text: 'Three', link: '/config/three' },
        { text: 'Four', link: '/config/four' }
      ]
    }
  ],
}
