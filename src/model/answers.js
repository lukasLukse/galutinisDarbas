import mongoose from "mongoose";

const answersSchema = mongoose.Schema({
  id: { type: String, required: true },
  answerText: { type: String, required: true },
  name: { type: String, required: true },
  userId: { type: String, required: true },
  date: { type: String, required: true },
  question_id: { type: String, required: true },
});

export default mongoose.model("Answers", answersSchema);
