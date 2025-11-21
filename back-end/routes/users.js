const express = require('express');
const router = express.Router();

// Sample user data 
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

// GET tous les utilisateurs
router.get('/', (req, res) => {
  res.json(users);
});

module.exports = router;
