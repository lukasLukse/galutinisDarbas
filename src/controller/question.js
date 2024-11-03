import { v4 as uuidv4 } from "uuid";
import QuestionModel from "../model/question.js";

const POST_QUESTION = async (req, res) => {
  try {
    const question = {
      id: uuidv4(),
      userId: req.body.userId,
      name: req.body.name,
      date: new Date().toLocaleString(),
      question: req.body.question,
    };

    const response = new QuestionModel(question);

    await response.save();

    return res
      .status(201)
      .json({ message: "Your question is posted.", response: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in application." });
  }
};

const GET_QUESTIONS = async (req, res) => {
  try {
    const response = await QuestionModel.find({ userId: req.body.userId });

    return res.status(200).json({ questions: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in application." });
  }
};

const GET_QUESTIONS_ALL = async (req, res) => {
  try {
    const response = await QuestionModel.find({});

    return res.status(200).json({ questions: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in application." });
  }
};

const GET_QUESTION_BY_ID = async (req, res) => {
  try {
    const response = await QuestionModel.findOne({ id: req.params.id });

    return res.status(200).json({ questions: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in application" });
  }
};

const DELETE_QUESTION = async (req, res) => {
  try {
    const question = await QuestionModel.findOne({ id: req.params.id });

    if (!question) {
      return res.status(404).json({ message: "Question not found." });
    }

    if (question.userId !== req.body.userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this question." });
    }

    await QuestionModel.findOneAndDelete({ id: req.params.id });

    return res.status(200).json({ message: "Question was deleted", question });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in application." });
  }
};

export const POST_LIKE = async (req, res) => {
  try {
    const question = await QuestionModel.findOne({ id });
    if (!question) {
      return res.status(404).json({ message: "Question not found." });
    }

    if (question.likes.includes(req.user.id)) {
      question.likes = question.likes.filter((id) => id !== req.user.id);
    } else {
      question.likes.push(req.user.id);
    }

    await question.save();

    return res
      .status(200)
      .json({ message: "Like status updated.", likes: question.likes.length });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error updating like status." });
  }
};

export {
  GET_QUESTIONS,
  POST_QUESTION,
  DELETE_QUESTION,
  GET_QUESTION_BY_ID,
  GET_QUESTIONS_ALL,
  POST_LIKE,
};
