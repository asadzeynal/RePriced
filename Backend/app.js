const https = require('https');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const redis = require('redis');
const http = require('http');
const socketIO = require('socket.io');
const RedisStore = require('connect-redis')(session);
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const passport = require('passport');
const passportSocketIo = require('passport.socketio');
require('./config/passport');
const userRoutes = require('./routes/user');
const tempUserRoutes = require('./routes/tempUser');
const authRoutes = require('./routes/auth');
const giveawayRoutes = require('./routes/giveaway');
const swaggerDocument = require('./routes/swagger');
const paymentRoutes = require('./routes/payment');

const port = process.env.PORT;
const app = express();

app.use(morgan('dev'));

let allowedOrigins = [];
if (process.env.ALLOWED_ORIGINS) {
  allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
}
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not '
        + 'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
};
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
const client = redis.createClient();
const sessionStore = new RedisStore({ client });
const sessionMiddleware = session({
  store: sessionStore,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
});
app.use(sessionMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(userRoutes);
app.use(tempUserRoutes);
app.use(giveawayRoutes);
app.use(authRoutes);
app.use(paymentRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let server;
try {
  const key = fs.readFileSync(process.env.KEY);
  const cert = fs.readFileSync(process.env.CERT);
  server = https.createServer({
    key, cert,
  }, app).listen(port, () => {
    console.log(`Server is running on ${port} port using https`);
  });
} catch (e) {
  server = http.createServer(app)
    .listen(port, () => {
      console.log(`Server is running on ${port} port using http`);
    });
}
const io = socketIO(server);
require('./socket/messenger')(io, client);

io.use(passportSocketIo.authorize({
  key: 'connect.sid',
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  passport,
  cookieParser,
}));
