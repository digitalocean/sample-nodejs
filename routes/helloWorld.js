const express = require('express');
const router = express.Router();

// Define the route for the /helloWorld URL path
router.get('/', (req, res, next) => {
  res.render('helloWorld.pug', { title: 'Hello, World!' });
});

module.exports = router;