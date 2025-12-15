import express from 'express'
import { getMe, updateProfile, UserLogin,UserRegister,} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const Router=express.Router();

Router.post('/login',UserLogin)
Router.post('/register',UserRegister)
Router.get('/me',protect,getMe)
Router.put("/update-profile", protect, upload.single("avatar"), updateProfile);

export default Router;