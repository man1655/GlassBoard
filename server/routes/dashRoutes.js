import express from 'express'
import { protect } from '../middleware/authMiddleware.js';
import { userChart, userState } from '../controllers/dashController.js';

const Router=express.Router();
/**
 * @swagger
 * /api/user/state:
 *   get:
 *     summary: Get dashboard user statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User statistics fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DashboardState'
 *       401:
 *         description: Unauthorized
 */

Router.get('/state',protect,userState)

/**
 * @swagger
 * /api/user/chart:
 *   get:
 *     summary: Get user signup chart data (last 7 days)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Chart data fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DashboardChartItem'
 *       401:
 *         description: Unauthorized
 */

Router.get('/chart',protect,userChart)

export default Router;