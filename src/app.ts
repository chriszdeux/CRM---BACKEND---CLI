import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { connectToDatabase } from './database/dataBaseConnection';
import { CoinsRoutes, CryptoActionsRoutes, EmployeesRoutes, UsersRoutes } from './routes';
import { CustomSessionData } from '../typings/express';

require('dotenv').config();

const app = express();

app.use(express.json());

const mongoUrl = process.env.DB_CONNECTION ?? '';
connectToDatabase(mongoUrl);

app.use(
  session({
    secret: process.env.SECRET_KEY || 'secret-key-by-one',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl }),
    cookie: { maxAge: 60 * 60 * 1000 }
  })
);

declare module 'express' {
  interface Request {
    session: CustomSessionData;
  }
}

const port = 8000;

app.get('/', function (req, res) {
  res.send('Server CLI alive');
});

app.use('/employees', EmployeesRoutes);
app.use('/users', UsersRoutes);
app.use('/coins', CoinsRoutes);

app.use('/crypto-actions', CryptoActionsRoutes)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
