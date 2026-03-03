import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import path from 'path';
import userRouter from './routes/userRouter.js';
import watchRouter from './routes/watchRoute.js';


const app = express();
const  port = 4000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB
connectDB();

// ROUTES
app.use("/api/auth", userRouter);
app.use("/uploads", express.static(Path.join(process.cwd(), "uploads")));
app.use("/api/watches", watchRouter);

app.get('/', (req, res) => {
    res.send("API WORKING");
});

app.listen(port, () => {
    console.log(`Server tarted on https://localhost:${port}`)
});