export const data = JSON.parse("{\"key\":\"v-8daa1a0e\",\"path\":\"/\",\"title\":\"Home\",\"lang\":\"ru-RU\",\"frontmatter\":{\"home\":true,\"title\":\"Home\",\"heroText\":\"Nervue\",\"tagline\":\"Vue 3 compatible state manager\"},\"excerpt\":\"\",\"headers\":[],\"git\":{\"updatedTime\":1662846767000,\"contributors\":[{\"name\":\"Anar\",\"email\":\"wiseadme@gmail.com\",\"commits\":4},{\"name\":\"Anar Allakhverdiev\",\"email\":\"wiseadme@gmail.com\",\"commits\":1}]},\"filePathRelative\":\"index.md\"}")

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
