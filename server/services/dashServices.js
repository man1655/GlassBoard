import User from "../model/User.js";
export const UserState = async () => {
  try {
    const today = new Date();
    const startday = new Date(today.setHours(0, 0, 0, 0));
    const ondedayago = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const [totalUsers, newSignup, activeSessions] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ createdAt: { $gte: startday } }),
      User.countDocuments({ updatedAt: { $gte: ondedayago } }),
    ]);
    return {
      totalUsers,
      newSignup,
      activeSessions,
    };
  } catch (err) {
    console.log(err);
  }
};

export const UserChart = async () => {
  try {
    const sevenDayAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const rawData = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDayAgo },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } }
    ]);
    // 2. Fill in missing days with 0 (For a smooth chart)
  const filledData = [];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateString = d.toISOString().split('T')[0];
    const dayName = days[d.getDay()];

    const found = rawData.find(item => item._id === dateString);

    filledData.push({
      name: dayName, 
      date: dateString, 
      users: found ? found.count : 0 
    });
  }

  return filledData;
  } catch (err) {
    console.log(err);
  }
};
