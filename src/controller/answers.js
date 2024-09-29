import AnswersModel from "../model/answers.js";
import { v4 as uuidv4 } from "uuid";

const POST_ANSWER = async (req, res) => {
  try {
    const answer = {
      id: uuidv4(),
      name: req.body.name,
      userId: req.body.userId,
      answerText: req.body.answerText,
      date: new Date().toLocaleString(),
      question_id: req.params.id,
    };

    const response = new AnswersModel(answer);

    await response.save();

    return res
      .status(201)
      .json({ message: "Your answer is posted.", response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in application." });
  }
};

const GET_ANSWERS = async (req, res) => {
  try {
    const questionId = req.params.id;
    const answers = await AnswersModel.find({ question_id: questionId });

    if (!answers.length) {
      return res
        .status(404)
        .json({ message: "No answers found for this question." });
    }

    return res.status(200).json({ answers });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in application." });
  }
};

const DELETE_ANSWER = async (req, res) => {
  try {
    const answer = await AnswersModel.findOne({ id: req.params.id });

    if (!answer) {
      return res.status(404).json({ message: "Answer not found." });
    }

    if (answer.userId !== req.body.userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this answer." });
    }

    await AnswersModel.findOneAndDelete({ id: req.params.id });

    return res
      .status(200)
      .json({ message: "Answer deleted successfully.", answer });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in application." });
  }
};

export { POST_ANSWER, GET_ANSWERS, DELETE_ANSWER };
