import './assets/css/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueFeather from 'vue-feather';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import vue3GoogleLogin from 'vue3-google-login';
import PageHeaderVue from './components/ui/PageHeader.vue';
import Icon from '@/components/ui/Icon.vue';

import '@fortawesome/fontawesome-free/css/all.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.component(VueFeather.name, VueFeather);
app.component('PageHeader', PageHeaderVue);
app.component('Icon', Icon);
app.use(createPinia());
app.use(Toast);
app.use(router);
app.use(vue3GoogleLogin, {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID, // 🔥 Thay bằng Google Client ID của bạn
});

app.mount('#app');
