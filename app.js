const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./back/authentication/routes');

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));