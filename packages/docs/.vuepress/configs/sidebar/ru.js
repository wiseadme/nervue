export default {
  '/api/': [
    {
      text: 'Документация API',
      children: [
        '/api/create-nervue.md',
        '/api/define-store.md',
        '/api/use-nervue.md',
        '/api/map-state.md',
        '/api/map-actions.md',
        '/api/v-nervue.md'
      ]
    }
  ],
  '/': [
    {
      text: 'Введение',
      children: [
        '/introduction.md',
        '/getting-started.md',
      ]
    },
    {
      text: 'Основные концепции',
      children: [
        '/core-concepts/index.md',
        '/core-concepts/state.md',
        '/core-concepts/guards.md',
        '/core-concepts/actions.md',
      ],
    }
  ],
}
