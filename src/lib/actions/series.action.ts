"use server";
import { connectToDatabase } from "../mongoose";

export const savingSeriesIntoDB = async (params: any) => {
  try {
    // Connect to the database
    await connectToDatabase();

    // Saving data into the database
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
  }
};
