import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import routes from './routes.js'
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: ["https://glass-board.vercel.app", "http://localhost:5173"], 
    credentials: true
}));
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api',routes)

connectDB(); 

app.get('/', (req, res) => {
    res.json({ message: "Backend is LIVE on Render!" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});