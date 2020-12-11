const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const rateLimiter = require('./utils/rate-limiter');
const routes = require('./routes/index');
const mainErrorHandler = require('./middlewares/mainErrorHandler');
const { diplomaBaseUrl, diplomaBaseOptions } = require('./utils/diploma-db');

const { PORT = 3000 } = process.env;
const app = express();

// заголовки для безопасности
app.use(helmet());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(diplomaBaseUrl, diplomaBaseOptions);

// защита от злых дудосеров
app.use(rateLimiter);

// подключаем логгер запросов
app.use(requestLogger);

// подключаем роуты
app.use('/', routes);

// подключаем логгер ошибок
app.use(errorLogger);

// обработчик ошибок celebrate
app.use(errors());

// централизованный обработчик ошибок
app.use(mainErrorHandler);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
