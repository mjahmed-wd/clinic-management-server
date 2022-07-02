import express from 'express';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import { todoRouter } from './routes/todo';

const app = express();
app.use(json());
app.use(todoRouter);

mongoose.connect('mongodb://localhost:27017/todo', {} , () => {
    console.log('connected to mongodb');
});

// const PORT = process.env.PORT || 3000;

app.listen(5000, () => {
    console.log('Server is running on port 5000');
}
);