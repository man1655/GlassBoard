import ActivityLog from "../model/ActivityLog.js";

export const logActivity = async (userId, userName, action, moduleName) => {
  try {
    const description = `${userName} user ${action} ${moduleName}`;
    
    await ActivityLog.create({
      User: userId,        
      userName: userName,
      action: action,
      module: moduleName,
      description: description
    });

  } catch (err) {
    console.error("Logging failed:", err);
  }
};