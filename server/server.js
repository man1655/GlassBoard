import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import routes from './routes.js'
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: ["https://glass-board.vercel.app", "http://localhost:5173"], // Replace with your ACTUAL Vercel URL
    credentials: true
}));
app.use(express.json());
app.use('/api',routes)

connectDB();

app.get('/', (req, res) => {
    res.json({ message: "Backend is LIVE on Render!" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});