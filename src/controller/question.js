import { v4 as uuidv4 } from "uuid";
import QuestionModel from "../model/question.js";

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

const POST_QUESTION = async (req, res) => {
  try {
    const question = {
      id: uuidv4(),
      userId: req.body.userId,
      date: new Date(),
      question: req.body.question,
    };

    const response = new QuestionModel(question);

    await response.save();

    return res
      .status(201)
      .json({ message: "Your question is posted.", response: response });
  } catch (error) {
    console.log(err);
    return res.status(500).json({ message: "Error in application." });
  }
};

const DELETE_QUESTION = async (req, res) => {
  try {
    const response = await QuestionModel.findOneAndDelete({
      id: req.params.id,
    });

    if (!response) {
      return res.status(404).json({
        message: "This question is already deleted, refresh your browser.",
      });
    }

    return res
      .status(200)
      .json({ message: "Question was deleted", question: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in application." });
  }
};

export {
  GET_QUESTIONS,
  POST_QUESTION,
  DELETE_QUESTION,
  GET_QUESTION_BY_ID,
  GET_QUESTIONS_ALL,
};
