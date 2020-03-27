import route from "express-promise-router";
import { check } from "express-validator";
import { register, login, logOut } from "../controllers/authController";

const router = route();

router.post(
  "/register",
  [
    check("email", "Email is not valid").isEmail(),
    check("password", "Minimal password length is 6 characters").isLength({
      min: 6
    })
  ],
  register
);
router.post(
  "/login",
  [
    check("email", "Email is not valid").isEmail(),
    check("password", "Enter password").exists({ checkFalsy: true })
  ],
  login
);

router.post("/logOut", logOut);

export default router;
