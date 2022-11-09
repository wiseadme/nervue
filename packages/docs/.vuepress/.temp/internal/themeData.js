export const themeData = JSON.parse("{\"colorMode\":\"light\",\"home\":\"/\",\"repo\":\"https://github.com/wiseadme/nervue\",\"editLink\":false,\"locales\":{\"/\":{\"selectLanguageName\":\"Русский\",\"navbar\":[{\"text\":\"Руководство\",\"link\":\"/introduction.html\"},{\"text\":\"API\",\"link\":\"/api/\"}],\"sidebar\":{\"/api/\":[{\"text\":\"\",\"children\":[\"/api/index.md\"]}],\"/\":[{\"text\":\"Введение\",\"children\":[\"/introduction.md\"]},{\"text\":\"Начинаем\",\"children\":[\"/getting-started.md\"]},{\"text\":\"Основные концепции\",\"children\":[\"/core-concepts/state.md\",\"/core-concepts/computed.md\",\"/core-concepts/guards.md\",\"/core-concepts/actions.md\",\"/core-concepts/expose.md\"]}]},\"home\":\"/\",\"selectLanguageText\":\"Язык\"},\"/en/\":{\"selectLanguageName\":\"English\",\"label\":\"English\",\"navbar\":[{\"text\":\"Guide\",\"link\":\"/en/introduction.html\"},{\"text\":\"API\",\"link\":\"/en/api/\"}],\"sidebar\":{\"/en/api/\":[{\"text\":\"api\",\"items\":[{\"text\":\"Index\",\"link\":\"/guide/\"},{\"text\":\"One\",\"link\":\"/api/one\"},{\"text\":\"Two\",\"link\":\"/api/two\"}]}],\"/en/\":[{\"text\":\"Introduction\",\"collapsible\":true,\"collapsed\":true,\"items\":[{\"text\":\"Nervue\",\"link\":\"/introduction.html\"}]},{\"text\":\"Main concepts\",\"items\":[{\"text\":\"Store\",\"link\":\"/core-concepts/index.html\"},{\"text\":\"State\",\"link\":\"/core-concepts/state.html\"},{\"text\":\"Guards\",\"link\":\"/core-concepts/guards.html\"},{\"text\":\"Actions\",\"link\":\"/core-concepts/actions.html\"}]},{\"text\":\"Config\",\"items\":[{\"text\":\"Index\",\"link\":\"/config/\"},{\"text\":\"Three\",\"link\":\"/config/three\"},{\"text\":\"Four\",\"link\":\"/config/four\"}]}]},\"home\":\"/en/\",\"selectLanguageText\":\"Languages\"}},\"colorModeSwitch\":true,\"navbar\":[],\"logo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebar\":\"auto\",\"sidebarDepth\":2,\"editLinkText\":\"Edit this page\",\"lastUpdated\":true,\"lastUpdatedText\":\"Last Updated\",\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
