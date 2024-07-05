"use server";
import Users from "@/database/users.model";
import { connectToDatabase } from "../mongoose";
import Series from "@/database/series.model";
import { getSeriesParams, getSeriesBasedOnItsIdParams } from "./shared.types";
import { FilterQuery } from "mongoose";

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
    const { searchQuery = "", category = "" } = params;

    const query: FilterQuery<typeof Series> = {};

    if (searchQuery !== "" && category !== "") {
      query.$and = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { category: { $eq: category } },
      ];
    }

    if (searchQuery === "" && category !== "") {
      query.category = { $eq: category };
    }

    const getSeries = await Series.find(query).populate({
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
