import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { User } from "../models/User";

export const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0].msg,
      });
    }
    const { email, password } = req.body;

    const candidate = await User.where({ email })
      .fetch({ require: false })
      .catch((e) => next(e));

    if (candidate.attributes.email === email) {
      return res.status(400).json({ message: "User already exist" });
    }

    if (!candidate) {
      const hashedPassword = await bcrypt.hash(password, 12);
      await User.forge({ email, password: hashedPassword }).save();

      const user = await User.where({ email }).fetch({ require: false });

      const token = jwt.sign(
        { userId: user.id, email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      return res
        .status(201)
        .json({ userId: user.id, email: user.email, token, loggedIn: true });
    }
  } catch (e) {
    next(e);
  }
};

export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0].msg,
      });
    }

    const { email, password } = req.body;
    const user = await User.where({ email })
      .fetch({ require: false })
      .catch((e) => next(e));

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.attributes.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Email or password is wrong" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.attributes.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({
      userId: user.id,
      email: user.attributes.email,
      token,
      loggedIn: true,
    });
  } catch (e) {
    next(e);
  }
};
