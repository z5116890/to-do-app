import app from './app'
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


