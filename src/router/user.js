import express from "express";

import { REGISTER, LOGIN, VALIDATE_LOGIN } from "../controller/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/register", REGISTER);
router.post("/login", LOGIN);
router.get("/login/validate", auth, VALIDATE_LOGIN);

export default router;
