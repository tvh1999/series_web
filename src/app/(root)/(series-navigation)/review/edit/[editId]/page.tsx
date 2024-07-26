import React from "react";
import ReviewForm from "@/components/shared/ReviewForm/ReviewForm";
import { getOneReview } from "@/lib/actions/reviews.action";

interface EditReviewPageProps {
  params: {
    editId: string;
  };
}

const EditReviewPage = async ({ params }: EditReviewPageProps) => {
  const reviewInfo = await getOneReview({ reviewId: params.editId });
  // console.log(reviewInfo);
  return (
    <div>
      <ReviewForm
        type="edit"
        userId={reviewInfo.author}
        seriesId={reviewInfo.product}
        reviewId={reviewInfo._id}
        title={reviewInfo.title}
        content={reviewInfo.content}
        seriesTitle={reviewInfo.product.title}
      />
    </div>
  );
};

export default EditReviewPage;
