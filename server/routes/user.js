import { getUser } from "../controllers/userController";
import route from "express-promise-router";
const router = route();

router.get("/getUser", getUser);

export default router;
