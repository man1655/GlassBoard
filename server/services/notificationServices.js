import Notification from "../model/Notification.js";

export const CreateNotification = async (data,userId) => {
  const notification=await Notification.create(
    {
      ...data,
      createdBy:userId
    }
  )
  return notification;
};

export const GetNotification = async () => {
  return  await Notification.find().sort({createdAt:-1})
};
export const UpdateNotification = async (id,data) => {
  return await Notification.findByIdAndUpdate(id,data,{new:true})
};
export const DeleteNotification = async (id) => {
  return await Notification.findByIdAndDelete(id);
};
