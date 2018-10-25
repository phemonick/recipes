const {
  get,
  getAll,
  create,
  update
} = require('../controllers/category');

module.exports = router => {
  router.get('/categories', getAll)
    .get('/categories/:id', get)
    .post('/categories', create)
    .patch('/categories/:id', update);
  return router;
};
