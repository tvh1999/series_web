"use server";
import { connectToDatabase } from "../mongoose";
import Users from "@/database/users.model";
import {
  bookmarkParams,
  createUserParams,
  deleteUserParams,
  updateUserParams,
  getSavedSeriesParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Series from "@/database/series.model";
import { FilterQuery } from "mongoose";
import console from "console";

export const findUserByClerkId = async (params: { clerkId: string }) => {
  try {
    await connectToDatabase();
    const { clerkId } = params;
    const userId = await Users.findOne({ clerkId });

    if (!userId)
      throw new Error("There is no such a clerk user in the database");

    const parsingUser = JSON.parse(JSON.stringify(userId));
    return parsingUser;
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

export const userBookmark = async (params: bookmarkParams) => {
  try {
    // Connect to database
    await connectToDatabase();

    const { userId, seriesId, path } = params;

    let updateQueryUserSide = {};
    let updateQuerySeriesSide = {};
    const user = await Users.findById(userId);
    if (user.bookmarks.includes(seriesId)) {
      updateQuerySeriesSide = { isBookmarked: false };
      updateQueryUserSide = { $pull: { bookmarks: seriesId } };
    } else {
      updateQuerySeriesSide = { isBookmarked: true };
      updateQueryUserSide = { $push: { bookmarks: seriesId } };
    }

    await Series.findByIdAndUpdate(seriesId, updateQuerySeriesSide, {
      new: true,
    });

    const toggleBookmark = await Users.findByIdAndUpdate(
      userId,
      updateQueryUserSide,
      {
        new: true,
      }
    );
    if (!toggleBookmark) throw new Error("Failed to toggle the bookmark");
    revalidatePath(path);
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};

export const getUserSavedSeriesById = async (params: getSavedSeriesParams) => {
  try {
    // Connect to database
    await connectToDatabase();

    // eslint-disable-next-line no-unused-vars
    const { clerkId, page = 1, pageSize = 10, searchQuery = "" } = params;

    const query: FilterQuery<typeof Series> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};

    const user = await Users.findOne({ clerkId }).populate({
      path: "bookmarks",
      match: query,
      options: { sort: { createdAt: -1 } },
      populate: [{ path: "reviews", model: Users }],
    });

    console.log(user);
    const series = user.bookmarks;
    const parsingSeries = JSON.parse(JSON.stringify(series));
    if (!parsingSeries)
      throw new Error("Can not get the user bookmarked series");
    return parsingSeries;
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};
