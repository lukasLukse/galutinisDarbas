import { v4 as uuidv4 } from "uuid";
import QuestionModel from "../model/question.js";

const QUESTIONS = async (req, res) => {
  try {
    const response = await QuestionModel.find({ question: req.body.question });

    return res.status(200).json({ question: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in application." });
  }
};

const QUESTION = async (req, res) => {
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

export { QUESTIONS, QUESTION, DELETE_QUESTION };
