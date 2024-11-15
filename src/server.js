import express from 'express';
import bodyParser from 'body-parser';
import productRouter from './routers/product.js';
import uploadRouter from './routers/upload.js';
import categories from './routers/categories.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mongoose from 'mongoose';
import userRouter from './routers/user.js';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

// Middleware for CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Static
app.use(express.static('src/public'));

// Routing
app.get('/', function (req, res) {
  res.send("<h1>Connect server succesfully</h1>");
});

// Router
app.use('/products', productRouter);
app.use('/upload', uploadRouter);
app.use('/auth', userRouter);
app.use('/categories', categories);


mongoose
  .connect('mongodb://localhost:27017/MyDatabase')
  .then(() => console.log('Connect to DB successfully'))
  .catch((error) => console.error('Error connecting to DB:', error));

app.listen(port, function () {
  console.log(`Server is running on localhost:${port}`);
});