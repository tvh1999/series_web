import { Schema, model, models, Document } from "mongoose";

export interface IUsersType extends Document {
  clerkId?: string;
  name: string;
  email?: string;
  profileImage?: string;
  username: string;
  description?: string;
  bookmarks: Schema.Types.ObjectId[];
  createdOn: Date;
}

const usersSchema = new Schema({
  clerkId: { type: String },
  name: { type: String, required: true, unique: true },
  email: { type: String, unique: true },
  profileImage: { type: String },
  username: { type: String, require: true, unique: true },
  description: { type: String },
  bookmarks: [{ type: Schema.Types.ObjectId, ref: "Series" }],
  createdOn: { type: Date, default: Date.now },
});

const Users = models.Users || model("Users", usersSchema);

export default Users;
