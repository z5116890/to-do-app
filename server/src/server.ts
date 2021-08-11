import express, { Express, Request, Response } from 'express';
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

app.use(router);
setupRoutes(router);
/* do i need this?
app.use(router)

app.get('/', (req : Request, res : Response) => items.getTodoItems(req, res))
app.post('/', (req : Request, res : Response) => items.insertTodoItem(req, res))
app.delete('/', (req : Request, res : Response) => items.deleteTodoItem(req, res))
app.patch('/', (req : Request, res : Response) => items.updateTodoItem(req, res))

*/
const port = 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
