"use server";
import Reviews from "@/database/reviews.model";
import { connectToDatabase } from "../mongoose";
import { createReviewsParams, getAllReviewsParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Series from "@/database/series.model";
import Users from "@/database/users.model";

export const createReviews = async (params: createReviewsParams) => {
  try {
    // connect to database
    await connectToDatabase();

    const { seriesId, userId, title, content, path } = params;

    // create a review
    const review = await Reviews.create({
      author: userId,
      product: seriesId,
      content,
      title,
    });

    await Series.findByIdAndUpdate(seriesId, {
      $push: { reviews: review._id },
    });

    if (!review) throw new Error("Failed to create the review");
    revalidatePath(path);
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};

export const getAllReviews = async (params: getAllReviewsParams) => {
  try {
    // connect to database
    await connectToDatabase();

    const { seriesId, sortOrder = "newest" } = params;

    // create a review
    const review = await Reviews.find({ product: seriesId })
      .populate({
        path: "author",
        model: Users,
        select: "username profileImage",
      })
      .populate({ path: "product", model: Series })
      .sort({ createdOn: sortOrder === "newest" ? -1 : 1 });

    if (!review) throw new Error("Failed to get the reivews");
    const parsingReview = JSON.parse(JSON.stringify(review));
    return parsingReview;
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};
