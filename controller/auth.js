import mongoose from "mongoose";
import UserModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createToken } from "../util/createToken.js";

// registration...........

export const register = async (req, res) => {
  console.log(req.body, "signup..");
  const { username, password } = req.body;
  const sault = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, sault);
  req.body.password = hashPassword;
  try {
    const oldUser = await UserModel.findOne({ username });
    if (oldUser) {
      return res.status(409).json({ message: "user already exist" });
    }
    const userData = new UserModel(req.body);

    userData.accessToken = createToken({ userId: userData._id }, "15");
    userData.refreshToken = createToken({ userId: userData._id }, "30d");

    const data = await userData.save();
    res.cookie("token", userData.refreshToken);
    // const token = jwt.sign(
    //   { username: user.username, id: user._id },
    //   process.env.JWT_KEY,
    //   { expiresIn: "2h" }
    // );
    console.log(data, "hgfg");
    res
      .status(200)
      .json({ message: "user registered successfully"});
  } catch (err) {
    console.log(err);
  }
};

// login....
export const login = async (req, res) => {

  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username: username });

    if (user) {
      const validity = await bcrypt.compare(password, user.password);
     

      if (!validity) {
        res.status(400).json("wrong password");
      } else {
        user.accessToken = createToken({ userId: user._id }, "15");
        user.refreshToken = createToken({ userId: user._id }, "30d");
        await user.save();
        res.cookie("token", user.refreshToken, {
          sameSite: "none",
          secure: true,
          httpOnly: true,
        });
        return res.status(200).json({
          user,
          token: user.accessToken,
          message: "successfully login",
        });
      }
    } else {
      res.status(404).json("user does not exists ");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
// logout
export const logout = async (req, res) => {
    res
      .cookie("token", null, { maxAge: 0 })
      .status(200)
      .send("successfully logout");
  };
  
