import { logActivity } from "../middleware/logger.js";
import ActivityLog from "../model/ActivityLog.js";
import { addUserService, deleteUserService, getUsersServices, getUserStatsService, updateUserService } from "../services/userServices.js";

export const getUserStats = async (req, res) => {
  try {
    const stats = await getUserStatsService();

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateUser = async (req, res) => {
  try {
    const user = await updateUserService({userId:req.params.id,data:req.body});
    await logActivity(req.user._id, req.user.fullName, "Updated", "User");

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const search = req.query.search || "";
    const Role = req.query.Role;        
    const status = req.query.status;

    const result = await getUsersServices({ page, limit, search,Role,status });

    res.status(200).json({
      success: true,
      data: result.users,
      pagination: result.pagination
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUser= async (req, res) => {
  try {
    const user=await deleteUserService(req.params.id);
    await logActivity(req.user._id, req.user.fullName, "Deleted", "User");

    res.status(200).json({
      success: true,
      data:user,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const addUser = async (req, res) => {
  try {
    await addUserService({data:req.body});
    await logActivity(req.user._id, req.user.fullName, "Created", "User");
    res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

