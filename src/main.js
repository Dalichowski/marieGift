import App from "./App.vue";

const app = createApp(App);

Object.values(plugins).forEach(app.use);

import "@/assets/tailwind.css";
import "@/assets/app.css";

app.mount("#app");

export default app;
