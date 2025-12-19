import express from "express";
import {
  createNotification,
  deleteNotification,
  getNotification,
  updateNotification,
} from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeAdmin } from "../middleware/roleMiddleware.js";

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
 *         description: List of notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 */
Router.get("/", getNotification);

/**
 * @swagger
 * /api/notification:
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
 *               - type
 *             properties:
 *               title:
 *                 type: string
 *                 example: New Feature Released
 *               message:
 *                 type: string
 *                 example: We just launched dark mode 🎉
 *               type:
 *                 type: string
 *                 enum: [info, warning, success, error]
 *                 example: success
 *     responses:
 *       201:
 *         description: Notification created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 */

// Routes
Router.post("/", protect, authorizeAdmin, createNotification);

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
 *         description: Notification ID
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
 *               type:
 *                 type: string
 *                 enum: [info, warning, success, error]
 *     responses:
 *       200:
 *         description: Notification updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 */

Router.put("/:id", protect, authorizeAdmin, updateNotification);

/**
 * @swagger
 * /api/notification/{id}:
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
 *     responses:
 *       200:
 *         description: Notification deleted successfully
 */

Router.delete("/:id", protect, authorizeAdmin, deleteNotification);

export default Router;
