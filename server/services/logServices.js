import ActivityLog from "../model/ActivityLog.js"

export const GetLog=async()=>{
  return await ActivityLog.find().sort({createdAt:-1});
}