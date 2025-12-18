import {
  CreateNotification,
  DeleteNotification,
  GetNotification,
  UpdateNotification,
} from "../services/notificationServices.js";

export const createNotification = async (req, res) => {
  try {
    const notification = await CreateNotification(req.body, req.user._id);

    res.status(200).json({
      success: true,
      data: notification,
      message: "Notification created successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
export const getNotification = async (req, res) => {
  try {
    const notification = await GetNotification();

    res.status(200).json({
      success: true,
      count: notification.length,
      data: notification,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
export const updateNotification = async (req, res) => {
  try {
    const updatedNotification = await UpdateNotification(
      req.params.id,req.body
    );
    if (!updatedNotification) {
      return res
        .status(404)
        .json({ success: false, message: "Notification not found" });
    }
    res.status(200).json({
      success: true,
      data: updatedNotification,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
export const deleteNotification = async (req, res) => {
  try {
    const deletedNotification = await DeleteNotification(req.params.id);
    if (!deletedNotification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }
    res.status(200).json({
      success: true,
      data: deletedNotification,
    });
    res.status(500).json({ success: false, error: error.message });
  } catch (error) {}
};
