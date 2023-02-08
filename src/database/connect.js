const mongo = require("mongoose");
mongo.set("strictQuery", false);

const checkEnv = () => {
  let environment = process.env.ENV || "dev";
  let db = "";

  switch (environment.toLowerCase()) {
    case "pro":
      db = process.env.MONGO_DATABASE;
    case "dev":
      db = process.env.MONGO_DEV_DATABASE;
    case "tes":
      db = process.env.MONGO_TEST_DATABASE;
    default:
      return {
        username: process.env.MONGO_USERNAME,
        password: process.env.MONGO_PASSWORD,
        database: db,
      };
  }
};

const getUri = ({ username, password, dabatase }) => {
  try {
    return `mongodb+srv://${username}:${password}.cy0lncg.mongodb.net/${dabatase}?retryWrites=true&w=majority`;
  } catch (error) {
    return console.log(`Credenciais invalidas ou inexistentes! ${error}`);
  }
};

const connectDatabase = async () => {
  await mongo.connect(getUri(checkEnv()), (error) => {
    if (error) {
      return console.log(`Erro ao conectar com o bando de dados! ${error}`);
    }
    return console.log("Conectado ao banco de dados");
  });
};

module.exports = connectDatabase;
