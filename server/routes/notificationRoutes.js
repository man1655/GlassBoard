import express from 'express';
import { createNotification, deleteNotification, getNotification, updateNotification } from '../controllers/notificationController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeAdmin } from '../middleware/roleMiddleware.js';

const Router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Notifications
 *     description: Managing user alerts
 */


/**
 * @swagger
 * /api/notification:
 *   get:
 *     summary: Get all notifications
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: Success - Returns list of notifications
 *
 *   post:
 *     summary: Create a notification 
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - message
 *             properties:
 *               title:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Notification created successfully
 */


// Routes
Router.get('/', getNotification);
Router.post('/', protect, authorizeAdmin, createNotification);

/**
 * @swagger
 * /api/notification/{id}:
 *   put:
 *     summary: Update a notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The notification ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated successfully
 *
 *   delete:
 *     summary: Delete a notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The notification ID
 *     responses:
 *       200:
 *         description: Deleted successfully
 */


Router.put('/:id', protect, authorizeAdmin, updateNotification);
Router.delete('/:id', protect, authorizeAdmin, deleteNotification);

export default Router;