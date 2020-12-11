const Articles = require('../models/article');
const {
  ValidationError,
  NotFoundError,
  ForbiddenError,
} = require('../errors');

const getAllArticles = (req, res, next) => {
  Articles.find({ owner: req.user._id })
    .then((articles) => res.send(articles))
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  const owner = req.user._id;
  Articles.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
  })
    .then((article) => res.send({
      _id: article._id,
      keyword: article.keyword,
      title: article.title,
      text: article.text,
      date: article.date,
      source: article.source,
      link: article.link,
      image: article.image,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Please type a right data!');
      }
      next(err);
    });
};

const deleteArticleById = (req, res, next) => {
  Articles.findById(req.params.articleId).select('+owner')
    .orFail(new NotFoundError('Нет такой статьи'))
    .then((article) => {
      if (article.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Недостаточно прав для удаления статьи');
      }
      article.remove();
      res.send({ message: 'Статья удалена из ленты' });
    })
    .catch(next);
};

module.exports = {
  getAllArticles,
  createArticle,
  deleteArticleById,
};
