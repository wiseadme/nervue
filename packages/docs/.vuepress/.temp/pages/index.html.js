export const data = JSON.parse("{\"key\":\"v-8daa1a0e\",\"path\":\"/\",\"title\":\"Главная\",\"lang\":\"ru-RU\",\"frontmatter\":{\"home\":true,\"title\":\"Главная\",\"heroText\":\"Nervue\",\"tagline\":\"Библиотека управления состоянием совместимая с Vue composition API\"},\"excerpt\":\"\",\"headers\":[],\"git\":{\"updatedTime\":1667760395000},\"filePathRelative\":\"index.md\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
