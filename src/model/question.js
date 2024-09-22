import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
  id: { type: String, required: true },
  user_id: { type: String },
  date: { type: String },
  question: { type: String },
});

export default mongoose.model("Question", questionSchema);
