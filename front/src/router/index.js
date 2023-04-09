import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../components/HomeView.vue';
import ConnexionForm from '../components/ConnexionForm.vue';
import InscriptionForm from '../components/InscriptionForm.vue';

const routes = [
  { path: '/', redirect: '/connexion' },
  { path: '/connexion', component: ConnexionForm },
  { path: '/inscription', component: InscriptionForm },
  { path: '/home', component: HomeView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
