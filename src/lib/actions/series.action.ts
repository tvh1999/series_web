"use server";
import Users from "@/database/users.model";
import { connectToDatabase } from "../mongoose";
import Series from "@/database/series.model";
import { getSeriesParams } from "./shared.types";

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

    const getSeries = await Series.find(params).populate({
      path: "reviews",
      model: Users,
    });

    const getSeriesObjects = getSeries.map((series) => series.toObject());

    // const parsingSeries = await JSON.parse(JSON.stringify(getSeries));
    if (!getSeriesObjects)
      throw new Error("There is no such series in the database");
    return getSeriesObjects;
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};
