import express from "express";

const router = express.Router();

router.get("/questions", QUESTIONS);
router.post("question", QUESTION);
router.delete("/answer/:id", DELETE_ANSWER);

export default router;
