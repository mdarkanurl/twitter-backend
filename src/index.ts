import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routers/userRoutes';
import tweetRouter from './routers/tweetRoutes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000; 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRouter);
app.use('/api/tweet', tweetRouter);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});