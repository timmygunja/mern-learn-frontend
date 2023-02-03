// LOCAL

const MONGODB_URL =
  "mongodb+srv://admin:admin@cluster0.lwsbc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const MONGODB_PASSWORD = "admin";
const PORT = 5000;

const env = {
  MONGODB_URL,
  MONGODB_PASSWORD,
  BASE_URL: "http://localhost:" + PORT,
};

export default env;
