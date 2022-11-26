export default {
  '/en/api/': [
    {
      text: '',
      children: [
        '/en/api/index.md'
      ]
    }
  ],
  '/en/': [
    {
      text: 'Introduction',
      collapsible: false,
      collapsed: false,
      children: [
        { text: 'Nervue', link: '/en/introduction.html' },
      ]
    },
    {
      text: 'Main concepts',
      children: [
        { text: 'State', link: '/en/core-concepts/state.html' },
        { text: 'Computed', link: '/en/core-concepts/computed.html' },
        { text: 'Guards', link: '/en/core-concepts/guards.html' },
        { text: 'Actions', link: '/en/core-concepts/actions.html' },
        { text: 'Plugins', link: '/en/core-concepts/plugins.html' },
      ],
    }
  ]
}
