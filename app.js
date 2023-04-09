const express = require('express');
const app = express();
const cors = require('cors');

// Ajouter cette ligne après l'initialisation de votre application Express
app.use(cors());

const port = 3000;

// Import des routes
const authRoutes = require('./back/authentication/authRoutes.js');

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Routes de l'API
app.use('/api/auth', authRoutes); // Toutes les routes de authRoutes commencent par /api/auth

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
