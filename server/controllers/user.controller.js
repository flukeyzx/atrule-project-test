import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import generateTokenAndSetCookies from "../utils/generateTokenAndSetCookies.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields.",
      });
    }

    if (username.length < 3) {
      return res.status(400).json({
        success: false,
        message: "username must be atleast 3 characters long.",
      });
    }

    if (/\s/.test(username)) {
      return res.status(400).json({
        success: false,
        message: "Username must not contain spaces.",
      });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be atleast 6 characters long.",
      });
    }

    const isAlreadyRegistered = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (isAlreadyRegistered) {
      const message =
        isAlreadyRegistered.email === email
          ? "This Email is already registered"
          : "This username is already taken.";
      return res.status(400).json({
        success: false,
        message,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    await generateTokenAndSetCookies(res, user._id);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in signup controller.", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if ((!username && !email) || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields.",
      });
    }

    const user = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Wrong credentials! User not found.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide correct password." });
    }

    await generateTokenAndSetCookies(res, user._id);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully.",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in login controller.", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const logout = async (_, res) => {
  try {
    return res
      .clearCookie("token")
      .json({ success: true, message: "User logged out successfully." });
  } catch (error) {
    console.log("Error in logout controller.", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      return res.status(200).json({
        success: true,
        message: "Profile fetched successfully.",
        user: {
          ...user._doc,
          password: undefined,
        },
      });
    }

    return res.status(404).json({ success: false, message: "User not found." });
  } catch (error) {
    console.log("Error in getProfile controller.", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};
