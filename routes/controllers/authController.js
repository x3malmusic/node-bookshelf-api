import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { User } from "../../models/User";

const createUser = async (email, password, name) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  await User.forge({ email, password: hashedPassword, name }).save();
};

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
      .fetch()
      .catch(e => {
        if (e.message === "EmptyResponse") {
          createUser(email, password, name);
          return res.status(201).json({ message: "User created" });
        }
        next(e);
      });

    if (candidate.attributes.email === email) {
      res.status(400).json({ message: "User already exist" });
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
        errors: errors.array(),
        message: "Email or password is not valid"
      });
    }

    const { email, password } = req.body;
    const user = await User.where({ email })
      .fetch()
      .catch(e => {
        if (e.message === "EmptyResponse") {
          return res.status(400).json({ message: "User not found" });
        }
        next(e);
      });

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
  } catch (e) {
    next(e);
  }
};
