import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please Provide FullName"],
      trim: [true],
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Please Provide Email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password Must Be Greater Than 8 Character"],
      select: false,
    },
    // --- 2. PROFILE DATA (BE-10) ---
    Role: {
      type: String,
      enum: ["user", "admin"],
      default:'user'
    },
    avatar: {
      type: String,
      default:null,
    },
    bio: {
      type: String,
      maxlength: [100, "Bio cannot be more than 250 characters"],
      default: "",
    },
    location: { type: String, default: "" },
  phone: { type: String, default: "" },
  tagline: { type: String, default: "" },
    // --- 3. PASSWORD RESET (Future Proofing) ---
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

// Hash-Password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
});
;


userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
