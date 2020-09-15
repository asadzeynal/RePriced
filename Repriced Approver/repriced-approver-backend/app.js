//express setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
//models setup
const seq = require('./models');

//routes
const userRoutes = require('./routes/user');
const giveawayRoutes = require('./routes/giveaway');

const PORT = 3000;

app.use(bodyParser.json());
app.use(userRoutes);//user related routes
app.use(giveawayRoutes);//giveaway related

app.listen(PORT, () => {
  console.log(`Server listening to PORT ${PORT}`);
});
