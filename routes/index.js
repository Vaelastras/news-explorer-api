const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const errors = require('./errors');
const { validateLogin, validateCreateUser } = require('../middlewares/validator');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.use(auth);
router.use('/', usersRouter);
router.use('/', articlesRouter);

// роут если адреса не существует
router.use('*', errors);

module.exports = router;
