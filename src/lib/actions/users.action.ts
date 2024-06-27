"use server";
import { connectToDatabase } from "../mongoose";
import Users from "@/database/users.model";
import {
  bookmarkParams,
  createUserParams,
  deleteUserParams,
  updateUserParams,
  getSavedSeriesParams,
  getUserBookmarksParams,
  getUserReviewsParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Series from "@/database/series.model";
import { FilterQuery } from "mongoose";
import console from "console";
import Reviews from "@/database/reviews.model";

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

export interface getAccountInfoParams {
  userId: string;
}

export const getUserAccountInfo = async (params: getAccountInfoParams) => {
  try {
    // Connect to database
    await connectToDatabase();

    const { userId: clerkId } = params;

    const user = await Users.findOne({ clerkId }).populate({
      path: "bookmarks",
      model: Series,
    });
    if (!user)
      throw new Error(
        "Can not recieve the required user data, please check the value of clerkId again"
      );
    const totalBookmarks = await Series.countDocuments({ isBookmarked: true });
    const totalReviews = await Reviews.countDocuments({ author: user._id });
    const parsedUser = JSON.parse(JSON.stringify(user));
    return { totalBookmarks, totalReviews, userInfo: parsedUser };
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};

export const getUserBookmarks = async (params: getUserBookmarksParams) => {
  try {
    // Connect to database
    await connectToDatabase();

    // eslint-disable-next-line no-unused-vars
    const { userId, page = 1, pageSize = 10 } = params;

    const totalBookmarks = await Series.countDocuments({ isBookmarked: true });
    const bookmarkedList = await Users.findById(userId)
      .select("_id bookmarks")
      .populate({ path: "bookmarks", model: Series });

    if (!bookmarkedList || !totalBookmarks)
      throw new Error(
        "There is something wrong when trying to retrieve the bookmarks list. Please check again the userId"
      );
    const parsedList = JSON.parse(JSON.stringify(bookmarkedList));
    return { dataList: parsedList, totalBookmarks };
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};

export const getUserReviews = async (params: getUserReviewsParams) => {
  try {
    // Connect to database
    await connectToDatabase();

    // eslint-disable-next-line no-unused-vars
    const { userId, page = 1, pageSize = 10 } = params;

    const totalReviews = await Reviews.countDocuments({ author: userId });

    const reviewsList = await Reviews.find({ author: userId })
      .select("content author createdOn title _id")
      .populate({
        path: "author",
        model: Users,
        select: "_id username profileImage",
      })
      .populate({ path: "product", model: Series, select: "_id" });

    if (!totalReviews || !reviewsList)
      throw new Error(
        "There has been an error when attempting to retrieve the reviews of this user. Recheck the userId if needed be"
      );

    const parsedList = JSON.parse(JSON.stringify(reviewsList));
    return { dataList: parsedList, totalReviews };
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

    const series = user.bookmarks;
    const parsingSeries = JSON.parse(JSON.stringify(series));
    if (!parsingSeries)
      throw new Error("Can not get the user bookmarked series");
    return parsingSeries;
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};
