import mongoose from "mongoose";

const answersSchema = mongoose.Schema({
  id: { type: String, required: true },
  answerText: { type: String, required: true },
  date: { type: String, required: true },
  gained_likes_number: { type: Number },
  question_id: { type: String, required: true },
});

export default mongoose.model("Answers", answersSchema);
