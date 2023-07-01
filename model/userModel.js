import mongoose from "mongoose";
const UserSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    accessToken: { type: String},

    refreshToken: { type: String },
    isAdmin: { type: Boolean, default: false },
    profilePicture: String,
  },
  { timestamps: true }
);
const UserModel = mongoose.model("Users", UserSchema);
export default UserModel;
