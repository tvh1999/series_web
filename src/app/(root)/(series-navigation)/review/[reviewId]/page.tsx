import ReviewForm from "@/components/shared/ReviewForm/ReviewForm";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { findUserByClerkId } from "@/lib/actions/users.action";

const ReviewPage = async ({ params }: { params: { reviewId: string } }) => {
  let mongoUser;
  const { userId } = auth();
  if (userId) {
    mongoUser = await findUserByClerkId({ clerkId: userId! });
  }
  return (
    <div>
      <ReviewForm
        type="create"
        seriesId={params.reviewId}
        userId={mongoUser?._id}
      />
    </div>
  );
};

export default ReviewPage;
