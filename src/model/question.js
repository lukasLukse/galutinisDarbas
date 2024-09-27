import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  userId: { type: String, required: true },
  date: { type: String, required: true },
  question: { type: String, required: true },
});

export default mongoose.model("Question", questionSchema);
