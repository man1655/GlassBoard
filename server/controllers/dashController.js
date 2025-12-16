import { UserChart, UserState } from "../services/dashServices.js";

export const userState = async (req, res) => {
  try {
    const stats=await UserState();
    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const userChart = async (req, res) => {
  try {
    const ChartData=await UserChart();
    res.status(200).json({
      success: true,
      data: ChartData,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};