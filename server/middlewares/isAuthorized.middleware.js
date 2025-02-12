import jwt from "jsonwebtoken";

const isAuthorized = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied! No authentication token provided.",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedToken;
    next();
  } catch (error) {
    console.log("Error in isAuthorized middleware.", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export default isAuthorized;
