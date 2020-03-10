export const getUser = async (req, res, next) => {
  try {
    res.status(200).json({ userId: req.user.userId });
  } catch (e) {
    next(e);
  }
};
