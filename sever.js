const express = require('express');
require('dotenv').config();
const { connectDB } = require('./config/db');
const produtoRoutes = require('./routes/produtoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDB();

app.use('/api', produtoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor a correr na porta ${PORT}`);
});