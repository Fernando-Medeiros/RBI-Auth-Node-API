import { set, connect } from "mongoose";

set("strictQuery", false);

export const checkEnv = () => {
  let _env = process.env.ENV || "dev";
  let db = process.env.MONGO_DEV_DATABASE;

  if (_env.toLowerCase() === "pro") {
    db = process.env.MONGO_DATABASE;
  } else if (_env.toLowerCase() === "test") {
    db = process.env.MONGO_TEST_DATABASE;
  }

  return {
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    database: db,
  };
};

export const getUri = ({ username, password, dabatase }) => {
  try {
    return `mongodb+srv://${username}:${password}.cy0lncg.mongodb.net/${dabatase}?retryWrites=true&w=majority`;
  } catch (error) {
    return console.log(`Credenciais invalidas ou inexistentes! ${error}`);
  }
};

export const connectDatabase = async () => {
  await connect(getUri(checkEnv()), (error) => {
    if (error) {
      return console.log(`Erro ao conectar com o bando de dados! ${error}`);
    }
    return console.log("Conectado ao banco de dados");
  });
};
