import { Schema, model, models, Document } from "mongoose";

export interface ISeriesType extends Document {
  id: number;
  title: string;
  thumbnail: {
    trending: { small: string; large: string };
    regular: { small: string; medium: string; large: string };
  };
  year: number;
  category: string;
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
  reviews?: Schema.Types.ObjectId[];
}

const seriesSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true, unique: true },
  thumbnail: {
    trending: { small: { type: String }, large: { type: String } },
    regular: {
      small: { type: String },
      medium: { type: String },
      large: { type: String },
    },
  },
  year: { type: Number, required: true },
  category: { type: String, required: true },
  rating: { type: String, required: true },
  isBookmarked: { type: Boolean },
  isTrending: { type: Boolean },
  reviews: { type: Schema.Types.ObjectId, ref: "Users" },
});

const Series = models.Series || model("Series", seriesSchema);

export default Series;
