const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const port1 = 3005;
const port2 = 3000;

const db = require('./config/db');
const route = require('./routes');

db.connect();
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.engine('.hbs', engine({
  extname: '.hbs',
  helpers: { sum: (a, b) => a + b }
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
app.use(express.urlencoded());
app.use(express.json());

route(app);


app.listen(port1, () => {
  console.log(`App listening on port1 http://localhost:${port1}`)
})
app.listen(port2, () => {
  console.log(`App listening on port2 http://localhost:${port2}`)
})