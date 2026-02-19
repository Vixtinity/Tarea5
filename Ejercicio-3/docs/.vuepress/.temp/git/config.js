import { GitContributors } from "C:/Users/Josue/Documents/cliente-5/Tarea5/Ejercicio-3/node_modules/@vuepress/plugin-git/lib/client/components/GitContributors.js";
import { GitChangelog } from "C:/Users/Josue/Documents/cliente-5/Tarea5/Ejercicio-3/node_modules/@vuepress/plugin-git/lib/client/components/GitChangelog.js";

export default {
  enhance: ({ app }) => {
    app.component("GitContributors", GitContributors);
    app.component("GitChangelog", GitChangelog);
  },
};
