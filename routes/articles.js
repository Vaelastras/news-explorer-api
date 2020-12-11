const router = require('express').Router();
const { validateArticleDelete, validateArticleCreate } = require('../middlewares/validator');
const {
  getAllArticles, createArticle, deleteArticleById,
} = require('../controllers/articles');

router.get('/articles', getAllArticles);
router.post('/articles', validateArticleCreate, createArticle);
router.delete('/article/:articleId', validateArticleDelete, deleteArticleById);

module.exports = router;
