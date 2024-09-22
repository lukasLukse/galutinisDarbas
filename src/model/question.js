import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
  id: { type: String, required: true },
  userId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  question: { type: String, required: true },
});

export default mongoose.model("Question", questionSchema);
