require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const routes = require('./routes');
const hospitalVerifierRoutes = require('./routes/hospitalVerifierRoutes'); // Tambahkan baris ini

const app = express();
app.use(express.json());

// API routes
app.use('/api', routes);
app.use('/api', hospitalVerifierRoutes); // Tambahkan baris ini

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});