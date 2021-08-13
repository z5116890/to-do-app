import express, { Express } from 'express';
const cors = require('cors');
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { setupRoutes } from './routes';
const app: Express = express();
const router = express.Router()


//allows you to make requests from one website to another website in the browser
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

setupRoutes(router);
app.use(router);

export default app;