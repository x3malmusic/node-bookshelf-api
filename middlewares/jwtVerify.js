const jwt = require("jsonwebtoken");

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token || "";
  try {
    if (!token) {
      return res.status(401).json("You need to Login");
    }
    await jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403);
      }
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};
