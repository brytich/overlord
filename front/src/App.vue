<template>
  <div>
    <InscriptionForm />
    <ConnexionForm />
  </div>
</template>

<script>
import InscriptionForm from './components/InscriptionForm.vue'
import ConnexionForm from './components/ConnexionForm.vue';

export default {
  name: 'App',
  components: {
    InscriptionForm,
    ConnexionForm,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
