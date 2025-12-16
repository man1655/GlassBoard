import express from 'express'
import { protect } from '../middleware/authMiddleware.js';
import { userChart, userState } from '../controllers/dashController.js';

const Router=express.Router();

Router.get('/state',protect,userState)
Router.get('/chart',protect,userChart)

export default Router;