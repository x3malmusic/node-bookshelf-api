export const getUser = async (req, res, next) => {
  try {
    res.status(200).json({
      userId: req.user.userId,
      loggedIn: req.user.loggedIn,
      email: req.user.email,
    });
  } catch (e) {
    next(e);
  }
};
