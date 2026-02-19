export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/components.html", { loader: () => import(/* webpackChunkName: "components.html" */"C:/Users/Josue/Documents/cliente-5/Tarea5/Ejercicio-3/docs/.vuepress/.temp/pages/components.html.js"), meta: {"title":"Documentación de Componentes"} }],
  ["/guide.html", { loader: () => import(/* webpackChunkName: "guide.html" */"C:/Users/Josue/Documents/cliente-5/Tarea5/Ejercicio-3/docs/.vuepress/.temp/pages/guide.html.js"), meta: {"title":"Guía de Uso"} }],
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"C:/Users/Josue/Documents/cliente-5/Tarea5/Ejercicio-3/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"Bienvenido a Ejercicio-3 Restaurant"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"C:/Users/Josue/Documents/cliente-5/Tarea5/Ejercicio-3/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
