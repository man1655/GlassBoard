import User from "../model/User.js";
import cloudinary from "../utils/cloudinary.js";

// Service to handle Registration Logic
export const registerUser = async ({ fullName, email, password }) => {
  // 1. Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already exists");
  }

  // 2. Create user
  const user = await User.create({
    fullName,
    email,
    password,
  });

  return user;
};

// Service to handle Login Logic
export const loginUser = async ({ email, password }) => {

  const user = await User.findOne({ email }).select("+password");
  
  if (!user) {
    throw new Error("Invalid credentials");
  }

  // 2. Check Password
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return user;
};


export const getUserProfile = async (userId) => {
  const user = await User.findById(userId);
  
  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const updateUserProfileService = async (userId, data, file) => {

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  if (file) {
    // Convert buffer to Base64
    const b64 = Buffer.from(file.buffer).toString("base64");
    let dataURI = "data:" + file.mimetype + ";base64," + b64;

    // Upload to 
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "glassboard_avatars",
    });

    user.avatar = result.secure_url;
  }

  // 2. Update Text Fields (Only if provided)
  if (data.bio) user.bio = data.bio;
  if (data.location) user.location = data.location;
  if (data.phone) user.phone = data.phone;
  if (data.tagline) user.tagline = data.tagline;
  if (data.fullName) user.fullName = data.fullName;

  // 3. Save to DB
  await user.save();

  // Return user without password
  const updatedUser = user.toObject();
  delete updatedUser.password;
  
  return updatedUser;
};