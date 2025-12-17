import User from "../model/User.js"

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
  };

  stats.forEach((item) => {
    result[item._id] = item.count;
  });

  return result;
};

export const getUsersServices=async({page,limit,search,Role,status})=>{

  const query={}

  if(search){
    query.$or = [
      { fullName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }
  if (Role) {
    query.Role = Role;
  }

  if (status) {
    query.status = status;
  }
  const skip=(page-1)*limit;
  const users=await User.find(query)
  .select("fullName email Role status createdAt").
  skip(skip)
  .limit(limit).
  sort({createdAt:-1})

  const totalUsers=await User.countDocuments(query);

  return {
    users,
    pagination:{
      page,
      totalPage:Math.ceil(totalUsers/limit),
      limit,
      totalUsers
    }
  }

}

export const updateUserService=async({userId,data})=>{
  const allowedFields=['Role','status']
  const updates={}
   allowedFields.forEach((field) => {
    if (data[field] !== undefined) {
      updates[field] = data[field];
    }
  });
  const users=await User.findByIdAndUpdate(
    userId,updates,{
      new:true,
      runValidators:true,
    }  
  )
  if (!users) throw new Error("User not found");
  return users;
}

export const deleteUserService=async(userId)=>{
  const users=await User.findByIdAndDelete(userId);
  if (!users) throw new Error("User not found");
  return users;
}