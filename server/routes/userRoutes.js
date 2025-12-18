import express from 'express'

import { addUser, deleteUser, getUsers, getUserStats, updateUser} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeAdmin } from '../middleware/roleMiddleware.js';
// import notificationRoutes from './routes/notificationRoutes.js'

const Router=express.Router();
Router.use(protect, authorizeAdmin);
Router.get('/state',getUserStats)
Router.get('/users',getUsers)
Router.post('/users',addUser)
Router.put('/users/:id',updateUser)
Router.delete('/users/:id',deleteUser)
 
export default Router;