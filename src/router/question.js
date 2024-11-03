import express from "express";

import {
  GET_QUESTIONS,
  POST_QUESTION,
  DELETE_QUESTION,
  GET_QUESTION_BY_ID,
  GET_QUESTIONS_ALL,
  // POST_LIKE,
} from "../controller/question.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/questions", auth, GET_QUESTIONS);
router.get("/public/questions", GET_QUESTIONS_ALL);
router.get("/questions/:id", auth, GET_QUESTION_BY_ID);
router.post("/question", auth, POST_QUESTION);
// router.put("/question/:id/like"), auth, POST_LIKE;
router.delete("/question/:id", auth, DELETE_QUESTION);

export default router;
