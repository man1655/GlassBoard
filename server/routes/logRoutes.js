import express from 'express'
import { protect } from '../middleware/authMiddleware.js';
import { getLog } from '../controllers/logController.js';
const Router=express.Router();

Router.get('/log',protect,getLog)


export default Router;