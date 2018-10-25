const {
  get,
  getAll,
  create,
  update,
  getRelation,
  remove
} = require('../controllers/recipe');

module.exports = router => {
  router.get('/recipes', getAll)
    .get('/recipes/:id', get)
    .get('/categories/:categoryId/recipes', getRelation)
    .post('/recipes', create)
    .patch('/recipes/:id', update)
    .delete('/recipes/:id', remove);
  return router;
};
