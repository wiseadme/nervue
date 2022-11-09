export const siteData = JSON.parse("{\"base\":\"/nervue/\",\"lang\":\"en-US\",\"title\":\"\",\"description\":\"\",\"head\":[[\"link\",{\"rel\":\"preconnect\",\"href\":\"https://fonts.googleapis.com\"}],[\"link\",{\"rel\":\"preconnect\",\"crossOrigin\":true,\"href\":\"https://fonts.gstatic.com\"}],[\"link\",{\"rel\":\"stylesheet\",\"href\":\"https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&display=swap\"}],[\"meta\",{\"name\":\"description\",\"content\":\"Nervue библиотека стэйт менеджмента для современных Vue приложений\"}]],\"locales\":{\"/\":{\"lang\":\"ru-RU\",\"title\":\"Nervue\",\"lastUpdated\":false,\"lastUpdatedText\":\"Последнее обновление\"},\"/en/\":{\"lang\":\"en-US\",\"title\":\"Nervue\",\"lastUpdated\":false,\"lastUpdatedText\":\"Last Updated\"}}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}
