// main.js
import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'swiper/swiper-bundle.min.css'; // This includes all necessary Swiper styles
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos';
import store from './store'; // Import the Vuex store

const app = createApp(App);

app.use(store);

// Initialize AOS
AOS.init({
    duration: 1000, // Duration of the animation
  });

app.mount('#app');
