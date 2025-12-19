import express from 'express'
import { protect } from '../middleware/authMiddleware.js';
import { getLog } from '../controllers/logController.js';
const Router=express.Router();

/**
 * @swagger
 * /api/log/log:
 *   get:
 *     summary: Get activity logs
 *     tags: [Activity Logs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Activity logs fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ActivityLog'
 *       401:
 *         description: Unauthorized
 */

Router.get('/log',protect,getLog)


export default Router;