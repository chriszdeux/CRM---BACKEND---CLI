import express from 'express';
import { clearConsole } from './utils';
import { userRoutes } from './routes';
import { connectToDatabase } from './database/dataBaseConnection';


const app = express();
const port = 8000;

clearConsole();

app.get('/', function (req, res) {
  res.send('Server CLI alive');
});

connectToDatabase()

app.use('/users', userRoutes);


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
