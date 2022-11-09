export const data = JSON.parse("{\"key\":\"v-2bb284dc\",\"path\":\"/en/introduction.html\",\"title\":\"Introduction\",\"lang\":\"en-US\",\"frontmatter\":{},\"excerpt\":\"\",\"headers\":[],\"git\":{\"updatedTime\":1663017120000,\"contributors\":[{\"name\":\"Anar\",\"email\":\"wiseadme@gmail.com\",\"commits\":1}]},\"filePathRelative\":\"en/introduction.md\"}")

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
