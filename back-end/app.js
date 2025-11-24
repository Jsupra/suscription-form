const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const routes = require('./routes/users');
require('dotenv').config();


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialiser la base de données
const db = require('./config/database');
const { initUserTable } = require('./models/User.model.js');
initUserTable(); //initialisation de la table au demarrage



// Routes
app.get('/', (req, res) => {
  res.send("Welcome to the API");
});

app.get('/health', (req, res) => {
  res.send("OK");
});


app.use('/users', routes);


//start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
