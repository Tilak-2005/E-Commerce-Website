import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({ success: false, message: "Not Authorised Login" });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    if (
      token_decode.email !== process.env.ADMIN_EMAIL ||
      token_decode.role !== "admin"
    ) {
      return res.json({ success: false, message: "Not Authorised Login" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
