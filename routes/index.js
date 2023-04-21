const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send('Laurels Echichinwo Jr.');
});

module.exports = routes;