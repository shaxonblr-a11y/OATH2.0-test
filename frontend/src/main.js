import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import AuthGoogle from './components/AuthGoogle.vue'

const routes = [
  { path: '/auth/google', component: AuthGoogle }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')