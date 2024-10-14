const path = require("path");
const express = require("express");
require('dotenv').config();
const { engine } = require("express-handlebars");
const cookieParser = require("cookie-parser");

const app = express();

const port = process.env.PORT_RUN_MAIN;

const db = require("./config/db");
const route = require("./routes");

app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    helpers: { sum: (a, b) => a + b },
  })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "resources", "views"));
app.use(express.json());

route(app);

async function main() {
  try {
    await db.connect();

    app.listen(port, () => {
      console.log(`App listening on port1 http://localhost:${port}`);
    });
  } catch (error) {
    console.log("Failed to connect to the database:", error);
  }
}

main();
