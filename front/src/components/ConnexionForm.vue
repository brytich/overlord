<template>
  <div class="auth-container">
    <form @submit.prevent="handleSubmit">
      <h2>Connexion</h2>
      <div class="form-group">
        <label for="email">Adresse email</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Se connecter</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './HomeView.vue';

export default {
  name: "ConnexionForm",
  router: createRouter({
        history: createWebHistory(),
        routes: [
  {
    path: '/home',
    component: HomeView
  },
  // ...
]
    }),
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      console.log('login called');
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          email: this.email,
          password: this.password,
        });

        // stocker le jeton dans le localStorage
        localStorage.setItem('token', response.data.token);
        console.log('Connexion réussie !');
        this.$router.push('/home');
        console.log('Redirection effectuée !');
        
        // rediriger l'utilisateur vers la page d'accueil
      } catch (error) {
        console.error(error);
      }
    },
    handleSubmit() {
      this.login();
    },
  },
};
</script>

  <style scoped>
  .auth-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  form {
    width: 300px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
  }
  
  h2 {
    margin-top: 0;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input {
    display: block;
    width: 100%;
    padding: 10px;
    border-radius: 3px;
    border: 1px solid #ccc;
  }
  
  button[type="submit"] {
    background-color: #0066cc;
    color: #fff;
    border: none;
    border-radius: 3px;
    padding: 10px 20px;
    margin-top: 20px;
    cursor: pointer;
  }
  </style>
  