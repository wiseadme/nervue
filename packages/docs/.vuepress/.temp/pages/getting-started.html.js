export const data = JSON.parse("{\"key\":\"v-5dc4b15a\",\"path\":\"/getting-started.html\",\"title\":\"Начинаем\",\"lang\":\"ru-RU\",\"frontmatter\":{},\"excerpt\":\"\",\"headers\":[],\"git\":{\"updatedTime\":1662644710000,\"contributors\":[{\"name\":\"Anar\",\"email\":\"wiseadme@gmail.com\",\"commits\":1}]},\"filePathRelative\":\"getting-started.md\"}")

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
