import App from "./App.vue";
import { createApp } from "vue";
import { createRouter } from "./router";
import { createAuth0 } from "@auth0/auth0-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLink, faUser, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import authConfig from "../auth_config.json";
import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import "highlight.js/styles/github.css";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createVuetify } from "vuetify/lib/framework.mjs";
import VueTablerIcons from "vue-tabler-icons";
hljs.registerLanguage("json", json);

const app = createApp(App);
const vuetify = createVuetify({
  components,
  directives,
});
library.add(faLink, faUser, faPowerOff);
app.use(vuetify);
app
  .use(VueTablerIcons)
  .use(hljsVuePlugin)
  .use(createRouter(app))
  .use(
    createAuth0({
      domain: authConfig.domain,
      clientId: authConfig.clientId,

      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: "https//www.ubeer.com",
      },
    })
  )
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
