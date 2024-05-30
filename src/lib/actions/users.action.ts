"use server";
import { connectToDatabase } from "../mongoose";
import Users from "@/database/users.model";
import {
  createUserParams,
  deleteUserParams,
  updateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Series from "@/database/series.model";

export const findUserById = async (id: string) => {
  try {
    await connectToDatabase();
    const userId = await Users.findOne({ clerkId: id });

    if (!userId)
      throw new Error("There is no such a clerk user in the database");
    return userId;
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};

export const createUser = async (params: createUserParams) => {
  try {
    // Connect to the database
    await connectToDatabase();

    // Create a new user
    const user = await Users.create(params);
    if (!user) throw new Error("Failed to create the user account");
    return user;
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};

export const updateUser = async (params: updateUserParams) => {
  try {
    // Connect to the database
    await connectToDatabase();

    const { clerkId, updateData, path } = params;

    // Update the user
    const user = await Users.findByIdAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    if (!user) throw new Error("Failed to update the selected user account");
    revalidatePath(path);
    return user;
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};

export const deleteUser = async (params: deleteUserParams) => {
  try {
    // Connect to the database
    await connectToDatabase();

    // delete the user
    const user = await Users.findOneAndDelete(params);
    if (!user) throw new Error("Failed to delete the user");

    // eslint-disable-next-line no-unused-vars
    const userBookmarkedSeriesIds = await Series.find({
      bookmarks: user._id,
    }).distinct("_id");

    // Delete series
    await Series.deleteMany({ author: user._id });

    // Delete answers, comments and more...
    const deletedUser = await Users.findByIdAndDelete(user._id);
    return deletedUser;
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};
