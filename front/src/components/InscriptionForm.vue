<template>
  <div class="form-container">
    <h2>Inscription</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          v-model="form.email"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input
          id="password"
          type="password"
          v-model="form.password"
          required
        />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirmation du mot de passe</label>
        <input
          id="confirmPassword"
          type="password"
          v-model="form.confirmPassword"
          required
        />
      </div>
      <div class="form-group">
        <button type="submit">S'inscrire</button>
      </div>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
        confirmPassword: ""
      },
      errorMessage: ""
    };
  },
  methods: {
    handleSubmit() {
      if (this.form.password !== this.form.confirmPassword) {
        this.errorMessage = "Les mots de passe ne correspondent pas";
        return;
      }

      // Envoyer le formulaire
      fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.form.email,
          password: this.form.password
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Erreur lors de l'inscription");
          }
          return response.json();
        })
        /*.then(data => {
          // Rediriger l'utilisateur vers la page de connexion
          this.$router.push("/login");
        })*/
        .catch(error => {
          this.errorMessage = error.message;
        });
    }
  }
};
</script>

<style>
.form-container {
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 8px;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  margin-top: 4px;
}

button[type="submit"] {
  background-color: #4caf50;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.error-message {
  color: #ff0000;
}
</style>
