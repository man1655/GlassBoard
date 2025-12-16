import express from 'express'
import authRoutes from './routes/authRoutes.js'
import dashRoutes from './routes/dashRoutes.js'
// import notificationRoutes from './routes/notificationRoutes.js'

const Router=express.Router();


Router.use('/auth',authRoutes)
Router.use('/user',dashRoutes)
// Router.use("/notifications", notificationRoutes);


export default Router;