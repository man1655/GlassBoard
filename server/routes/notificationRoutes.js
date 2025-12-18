import express from 'express'
import { createNotification, deleteNotification, getNotification, updateNotification } from '../controllers/notificationController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeAdmin } from '../middleware/roleMiddleware.js';


const Router=express.Router();
Router.get('/',getNotification)
Router.post('/',protect,authorizeAdmin,createNotification)
Router.put('/:id',protect,authorizeAdmin,updateNotification)
Router.delete('/:id',protect,authorizeAdmin,deleteNotification)


export default Router;