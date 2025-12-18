import axios from 'axios';


const API_URL = `${import.meta.env.VITE_API_URL}/api/notification/`;

const createNotification = async (notificationData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  console.log("Token being sent:", token); 
  console.log("Full Config:", config);
  const response = await axios.post(API_URL, notificationData, config);
  return response.data;
};

const getNotifications = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const updateNotification = async (id, notificationData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.put(API_URL + id, notificationData, config);
  return response.data;
};

const deleteNotification = async (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(API_URL + id, config);
  return response.data;
};

const notificationService = {
  createNotification,
  getNotifications,
  updateNotification,
  deleteNotification,
};

export default notificationService;