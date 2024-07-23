import ReviewForm from "@/components/shared/ReviewForm/ReviewForm";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { findUserByClerkId } from "@/lib/actions/users.action";
import { getSeriesBasedOnItsId } from "@/lib/actions/series.action";

const ReviewPage = async ({ params }: { params: { reviewId: string } }) => {
  let mongoUser;
  const { userId } = auth();
  if (userId) {
    mongoUser = await findUserByClerkId({ clerkId: userId! });
  }
  const series = await getSeriesBasedOnItsId({ seriesId: params.reviewId });
  return (
    <div>
      <ReviewForm
        type="create"
        seriesId={params.reviewId}
        userId={mongoUser?._id}
        seriesTitle={series.title}
      />
    </div>
  );
};

export default ReviewPage;
