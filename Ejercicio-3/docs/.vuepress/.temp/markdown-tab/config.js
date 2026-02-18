import { CodeTabs } from "C:/Users/Josue/Documents/cliente-5/Tarea5/Ejercicio-3/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/CodeTabs.js";
import { Tabs } from "C:/Users/Josue/Documents/cliente-5/Tarea5/Ejercicio-3/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/Tabs.js";
import "C:/Users/Josue/Documents/cliente-5/Tarea5/Ejercicio-3/node_modules/@vuepress/plugin-markdown-tab/lib/client/styles/vars.css";

export default {
  enhance: ({ app }) => {
    app.component("CodeTabs", CodeTabs);
    app.component("Tabs", Tabs);
  },
};
