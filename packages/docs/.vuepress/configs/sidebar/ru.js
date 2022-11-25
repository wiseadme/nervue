export default {
  '/api/': [
    {
      text: '',
      children: [
        '/api/index.md',
      ]
    }
  ],
  '/': [
    {
      text: 'Введение',
      children: [
        '/introduction.md',
      ]
    },
    {
      text: 'Начинаем',
      children: [
        '/getting-started.md',
      ]
    },
    {
      text: 'Основные концепции',
      children: [
        '/core-concepts/state.md',
        '/core-concepts/computed.md',
        '/core-concepts/guards.md',
        '/core-concepts/actions.md',
        '/core-concepts/expose.md',
        '/core-concepts/plugins.md',
      ],
    }
  ],
}
