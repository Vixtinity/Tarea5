import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'es-ES',
  title: 'Ejercicio-3 Restaurant',
  description: 'Sistema de reservas con Vue 3 y Pinia',

  theme: defaultTheme({
    logo: 'https://vuejs.org/images/logo.png',
    navbar: [
      { text: 'Inicio', link: '/' },
      { text: 'Guía de Uso', link: '/guide.md' },
      { text: 'Componentes', link: '/components.md' },
    ],
    sidebar: [
      '/',
      '/guide.md',
      '/components.md'
    ]
  }),

  bundler: viteBundler(),
})
