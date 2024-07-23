"use server";
import Users from "@/database/users.model";
import { connectToDatabase } from "../mongoose";
import Series from "@/database/series.model";
import { getSeriesParams, getSeriesBasedOnItsIdParams } from "./shared.types";
import { FilterQuery } from "mongoose";
import Reviews from "@/database/reviews.model";

export const savingSeriesIntoDB = async (params: any) => {
  try {
    // Connect to the database
    await connectToDatabase();
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
  }
};

export const getSeriesFromDB = async (params: getSeriesParams) => {
  try {
    await connectToDatabase();
    const { searchQuery = "", category = "", isTrending = false } = params;

    const query: FilterQuery<typeof Series> = {};

    if (searchQuery !== "" && category !== "") {
      query.$and = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { category: { $eq: category } },
      ];
    }

    if (isTrending) {
      query.isTrending = { $eq: true };
    }

    // const abc = "title";
    // const query2 = { [abc]: { $regex: searchQuery, $options: "i" } };
    // const test2 = await Series.find(query2);

    if (searchQuery === "" && category !== "") {
      query.category = { $eq: category };
    }

    const getSeries = await Series.find(query).populate({
      path: "reviews",
      model: Reviews,
    });

    const parsingSeries = await JSON.parse(JSON.stringify(getSeries));
    if (!parsingSeries)
      throw new Error("There is no such series in the database");
    return parsingSeries;
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};

export const getSeriesBasedOnItsId = async (
  params: getSeriesBasedOnItsIdParams
) => {
  try {
    await connectToDatabase();
    const { seriesId } = params;
    const getSeries = await Series.findById(seriesId).populate({
      path: "reviews",
      model: Users,
    });

    const parsingSeries = await JSON.parse(JSON.stringify(getSeries));
    if (!parsingSeries)
      throw new Error("There is no such series in the database");
    return parsingSeries;
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};

export interface CheckBookmarkedParams {
  userId: string;
  currentSeriesId: string;
}

export const checkSeriesBookmarked = async (params: CheckBookmarkedParams) => {
  try {
    // connect to database
    await connectToDatabase();

    const { userId, currentSeriesId } = params;

    const user = await Users.findById(userId);
    const parsedUser = JSON.parse(JSON.stringify(user));
    const bookmarkedList = parsedUser.bookmarks;
    if (!user) throw new Error("Fail to retrieve the ");

    if (bookmarkedList.includes(currentSeriesId)) {
      await Series.findByIdAndUpdate(currentSeriesId, { isBookmarked: true });
      return true;
    } else {
      await Series.findByIdAndUpdate(currentSeriesId, { isBookmarked: false });
      return false;
    }
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};
