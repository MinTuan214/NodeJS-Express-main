const path = require("path");
const express = require("express");
const { engine } = require("express-handlebars");
const cookieParser = require("cookie-parser");

const app = express();
const port1 = 3005;
const port2 = 3000;

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
app.use(express.urlencoded());
app.use(express.json());

route(app);

async function main() {
  try {
    await db.connect();

    app.listen(port1, () => {
      console.log(`App listening on port1 http://localhost:${port1}`);
    });
    app.listen(port2, () => {
      console.log(`App listening on port2 http://localhost:${port2}`);
    });
  } catch (error) {
    console.log("Failed to connect to the database:", error);
  }
}

main();
