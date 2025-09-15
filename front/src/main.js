import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '../src/assets/styles.css' 

const app = createApp(App);

app.config.globalProperties.$currentUser = JSON.parse(localStorage.getItem('user') || 'null');

app.use(router);
app.mount('#app');
