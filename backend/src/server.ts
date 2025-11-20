import express, { Express, NextFunction,Request,Response} from 'express';
import * as database from './config/database';
import dotenv from 'dotenv';
import cors from 'cors';
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware';
import clientRoutes from './routes';


dotenv.config();

database.connect();

const app: Express = express();
const port: Number | String = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());    


clientRoutes(app);

// Middleware xử lý lỗi tập trung trong ứng dụng Back-end NodeJS (ExpressJS)
app.use(errorHandlingMiddleware);


app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
