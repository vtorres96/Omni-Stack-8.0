const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv/config");

const app = express();

const server = require("http").Server(app);

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${
    process.env.DB_PASS
  }@cluster0-bfkrt.mongodb.net/${
    process.env.DB_NAME
  }?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true
  }
);

app.use(cors());
app.use(express.json());
app.use(require("./routes"));

server.listen(3333, () => {
  console.log("Servidor rodando na porta: 3333");
});
