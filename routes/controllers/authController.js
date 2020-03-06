import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { User } from "../../models/User";

export const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Email is not valid or password is too short"
      });
    }
    const { email, password, name } = req.body;

    const candidate = await User.where({ email })
      .fetch({ require: false })
      .catch(e => next(e));

    if (!candidate) {
      const hashedPassword = await bcrypt.hash(password, 12);
      await User.forge({ email, password: hashedPassword, name }).save();
      const user = await User.where({ email }).fetch({ require: false });

      const token = jwt.sign({ userId: user.id }, process.env.jwtSecret, {
        expiresIn: "1h"
      });

      return res.json({ message: "User created", token, userId: user.id });
    }

    if (candidate.attributes.email === email) {
      res.status(400).json({ message: "User already exist" });
    }
  } catch (e) {}
};

export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Email or password is not valid"
      });
    }

    const { email, password } = req.body;
    const user = await User.where({ email })
      .fetch({ require: false })
      .catch(e => next(e));

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.attributes.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Email or password is not valid" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.jwtSecret, {
      expiresIn: "1h"
    });

    res.json({ token, userId: user.id });
  } catch (e) {}
};
