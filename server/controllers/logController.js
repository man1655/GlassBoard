import { GetLog } from "../services/logServices.js";

export const getLog=async (req, res) => {
  try {
    const logs=await GetLog();
    if(logs){
      res.status(200).json({
        success: true,
        data: logs,
      });
    }
  } catch (error) {
    
  }
}