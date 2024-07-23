"use server";
import Reviews from "@/database/reviews.model";
import { connectToDatabase } from "../mongoose";
import {
  createReviewsParams,
  deleteReviewsParams,
  getAllReviewsParams,
  getOneReviewParams,
  updateReviewParams,
} from "./shared.types";
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

    await Users.findByIdAndUpdate(userId, { $inc: { reputation: 10 } });

    if (!review) throw new Error("Fail to create the review");
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

export const deleteReviews = async (params: deleteReviewsParams) => {
  try {
    // Connect to database
    await connectToDatabase();

    const { seriesId, reviewId, path } = params;

    // Find the document that the review originated from and delete the _id of the review
    const series = await Series.findByIdAndUpdate(
      seriesId,
      {
        $pull: { reviews: reviewId },
      },
      { new: true }
    );

    // Delete the review document
    const document = await Reviews.findByIdAndDelete(reviewId);
    if (!document || !series)
      throw new Error(
        "Can not delete review. Check the reviewId and seriesId for debugging purpose"
      );

    await Users.findByIdAndUpdate(document.author, {
      $inc: { reputation: -5 },
    });

    revalidatePath(path);
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};

export const updateReview = async (params: updateReviewParams) => {
  try {
    // Connect to database
    await connectToDatabase();

    const { reviewId, title, content, path } = params;

    // Find the review document based on the reviewId provided
    const review = await Reviews.findByIdAndUpdate(
      reviewId,
      {
        title,
        content,
      },
      { new: true }
    );

    if (!review)
      throw new Error(
        "Can't update the reivew, please recheck the updated content for the review (title, review paragraph) and reviewId"
      );

    revalidatePath(path);
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};

export const getOneReview = async (params: getOneReviewParams) => {
  try {
    // Connect to database
    await connectToDatabase();

    const { reviewId } = params;

    // Find the review
    const review = await Reviews.findById(reviewId);

    if (!review)
      throw new Error(
        "Can not retrieve the document. Please recheck the reviewId"
      );

    const parsedReview = JSON.parse(JSON.stringify(review));
    return parsedReview;
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};
