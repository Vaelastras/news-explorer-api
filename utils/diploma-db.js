require('dotenv').config();

const diplomaBaseUrl = (process.env.NODE_ENV !== 'production') ? 'mongodb://localhost:27017/diplomadb' : process.env.DIPLOMA_DB;
const diplomaBaseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

module.exports = {
  diplomaBaseUrl,
  diplomaBaseOptions,
};
