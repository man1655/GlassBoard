import User from "../model/User.js";
import { registerUser, loginUser, getUserProfile, updateUserProfileService } from "../services/authServices.js";
import cloudinary from "../utils/cloudinary.js";
// --- REGISTER CONTROLLER ---
export const UserRegister = async (req, res) => {
  try {
    const user = await registerUser(req.body);

    sendTokenResponse(user, 201, res);

  } catch (error) {
    if (error.message === "User already exists") {
      return res.status(400).json({ success: false, message: error.message });
    }
    // Handle server errors
    res.status(500).json({ success: false, error: error.message });
  }
};

// --- LOGIN CONTROLLER ---
export const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    const user = await loginUser({ email, password });
    if (user.status === "banned") {
  return res.status(403).json({
    success: false,
    message: "Your account has been banned. Contact support.",
  });
}


    sendTokenResponse(user, 200, res);

  } catch (error) {
      if (error.message === "Invalid credentials") {
      return res.status(401).json({ success: false, message: error.message });
    }
    // Handle server errors
    res.status(500).json({ success: false, error: error.message });
  }
};

// --- HELPER FUNCTION (Kept in Controller) ---
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 
    httpOnly: true,
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      message: statusCode === 201 ? "User Registered Successfully" : "User Login Successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
};

export const getMe = async (req, res) => {
  try {
    const user = await getUserProfile(req.user.id);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    let updateData = { ...req.body }; // Start with the text data (bio, phone, etc.)

    console.log("--- FORCE UPDATE PROFILE ---");

    // 1. Handle Image Upload
    if (req.file) {
      console.log("Creating Cloudinary URL...");
      
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "glassboard_avatars",
      });

      console.log("New Avatar URL:", result.secure_url);
      
      // Force the avatar field into the update object
      updateData.avatar = result.secure_url;
    }


    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData }, // $set ensures we only update the fields provided
      { new: true, runValidators: true } // Returns the NEW updated document
    ).select("-password");

    console.log("Database Updated Successfully:", updatedUser.avatar);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });

  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  // 1. Get the user ID from the request (set by middleware)
  const userId = req.user._id;

  // 2. ⚠️ CRITICAL FIX: Find the user again and EXPLICITLY ask for the password
  // The 'select' with '+password' overrides the default exclusion if defined in schema
  const user = await User.findById(userId).select('+password'); 

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // 3. Now this works because user.password is defined
  const isMatch = await user.matchPassword(oldPassword);

  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid current password"); // Security: Generic message is better
  }

  // 4. Update and Save
  user.password = newPassword; // Your pre-save hook handles hashing
  await user.save();

  res.status(200).json({ message: "Password updated successfully" });
};