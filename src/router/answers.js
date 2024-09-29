import express from "express";

import {
  POST_ANSWER,
  GET_ANSWERS,
  DELETE_ANSWER,
} from "../controller/answers.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/question/:id/answers", GET_ANSWERS);
router.post("/answers/:id", auth, POST_ANSWER);
router.delete("/answer/:id", auth, DELETE_ANSWER);

export default router;
