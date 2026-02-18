import comp from "C:/Users/Josue/Documents/cliente-5/Tarea5/Ejercicio-3/docs/.vuepress/.temp/pages/components.html.vue"
const data = JSON.parse("{\"path\":\"/components.html\",\"title\":\"Documentación de Componentes\",\"lang\":\"es-ES\",\"frontmatter\":{},\"git\":{},\"filePathRelative\":\"components.md\"}")
export { comp, data }

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
