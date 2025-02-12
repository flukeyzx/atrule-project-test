import jwt from "jsonwebtoken";

const generateTokenAndSetCookies = async (res, userId) => {
  try {
    const token = jwt.sign(
      {
        _id: userId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
  } catch (error) {
    console.log("Error in generateTokenAndSetCookies method.", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export default generateTokenAndSetCookies;
