import express, { Request, Response } from 'express';
import { Todo } from './../model/todo';

const router = express.Router();

router.get('/api/todo', (req: Request, res: Response) => {
    const { title, description } = req.body;
    return res.send({ title, description });
});

router.post('/api/todo', async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const todo = Todo.build({ title, description });

    try {
        await todo.save();
        return res.status(201).send('the todo created');
    } 
    catch (err) {
        return res.status(400).send("could not save the todo");
    }

})

export { router as todoRouter };