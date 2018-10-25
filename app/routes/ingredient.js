const {
  get,
  getAll,
  create,
  update,
  getRelation,
  remove
} = require('../controllers/ingredient');


module.exports = router => {
  router.get('/ingredients', getAll)
    .get('/ingredients/:id', get)
    .get('/recipes/:recipeId/ingredients', getRelation)
    .post('/recipes/:recipeId/ingredients', create)
    .patch('/ingredients/:id', update)
    .delete('/ingredients/:id', remove);
  return router;
};
