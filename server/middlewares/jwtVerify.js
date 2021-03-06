const jwt = require("jsonwebtoken");

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers;
  const token =
    authHeader.authorization && authHeader.authorization.split(" ")[1];
  try {
    if (!token) {
      return res.status(401).json({ loggedIn: false });
    }
    await jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403);
      }
      req.user = {
        userId: user.userId,
        email: user.email,
        loggedIn: true,
      };
      next();
    });
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};
