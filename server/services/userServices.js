import User from "../model/User.js";

export const getUserStatsService = async () => {
  const stats = await User.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const total = await User.countDocuments();

  const result = {
    total,
    active: 0,
    banned: 0,
    inactive: 0,
  };

  stats.forEach((item) => {
    result[item._id] = item.count;
  });

  return result;
};

export const getUsersServices = async ({
  page,
  limit,
  search,
  Role,
  status,
}) => {
  const query = {};

  if (search) {
    query.$or = [
      { fullName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }
  if (Role) {
    query.Role = Role;
  }

  if (status) {
    query.status = status; // active | inactive | banned
  } else {
    query.status = "active"; // DEFAULT
  }
  const skip = (page - 1) * limit;
  const users = await User.find(query)
    .select("fullName email Role status createdAt")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const totalUsers = await User.countDocuments(query);

  return {
    users,
    pagination: {
      page,
      totalPage: Math.ceil(totalUsers / limit),
      limit,
      totalUsers,
    },
  };
};

export const updateUserService = async ({ userId, data }) => {
  const allowedFields = ["Role", "status"];
  const updates = {};

  allowedFields.forEach((field) => {
    if (data[field] !== undefined) {
      updates[field] = data[field];
    }
  });

  if (Object.keys(updates).length === 0) {
    throw new Error("No valid fields provided for update");
  }

  const user = await User.findOneAndUpdate(
    { _id: userId, status: { $ne: "inactive" } },
    updates,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) {
    throw new Error("User not found or inactive");
  }

  return user;
};

export const deleteUserService = async (userId) => {
  const user = await User.findOneAndUpdate(
    { _id: userId, status: "active" },
    { status: "inactive" },
    { new: true }
  );

  if (!user) {
    throw new Error("User not found or already inactive");
  }

  return user;
};

export const addUserService = async ({ data }) => {
  const users = await User.create(data);
  return users;
};
