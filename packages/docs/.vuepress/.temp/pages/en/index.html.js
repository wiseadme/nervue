export const data = JSON.parse("{\"key\":\"v-2d0a870d\",\"path\":\"/en/\",\"title\":\"Main page\",\"lang\":\"en-US\",\"frontmatter\":{\"home\":true,\"title\":\"Main page\",\"heroText\":\"Nervue\",\"tagline\":\"Vue composition API compatible state manager library\"},\"excerpt\":\"\",\"headers\":[],\"git\":{\"updatedTime\":1662813875000,\"contributors\":[{\"name\":\"Anar\",\"email\":\"wiseadme@gmail.com\",\"commits\":1}]},\"filePathRelative\":\"en/index.md\"}")

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
