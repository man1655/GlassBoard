import express from 'express'
import authRoutes from './routes/authRoutes.js'

const Router=express.Router();


Router.use('/auth',authRoutes)


export default Router;