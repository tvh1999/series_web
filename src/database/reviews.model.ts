import { model, models, Schema, Document } from "mongoose";

export interface IReview extends Document {
  author: Schema.Types.ObjectId;
  product: Schema.Types.ObjectId;
  title: string;
  content: string;
  createdOn: Date;
}

const reviewSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  product: { type: Schema.Types.ObjectId, ref: "Series", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
});

const Reviews = models.Reviews || model("Reviews", reviewSchema);

export default Reviews;
