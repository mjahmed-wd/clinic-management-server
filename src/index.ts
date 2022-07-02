import express from 'express';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import { todoRouter } from './routes/todo';
import { userRouter } from './routes/usersRoute';

const app = express();
app.use(json());
app.use(todoRouter);
app.use(userRouter);

mongoose.connect('mongodb://localhost:27017/clinic-mangement', {} , () => {
    console.log('connected to mongodb');
});

// const PORT = process.env.PORT || 3000;

app.listen(5000, () => {
    console.log('Server is running on port 5000');
}
);