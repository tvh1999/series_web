import React from "react";
import { getUserReviews } from "@/lib/actions/users.action";
import ReviewCard from "../ReviewCard/ReviewCard";

interface ReviewsTabProps {
  userId: string;
}

const ReviewsTab = async ({ userId }: ReviewsTabProps) => {
  const { dataList } = (await getUserReviews({ userId })) as { dataList: any };
  // console.log({ dataList });
  return (
    <div className="flex flex-col gap-y-4">
      {dataList.map((item: any) => (
        <ReviewCard key={crypto.randomUUID()} review={item} />
      ))}
    </div>
  );
};

export default ReviewsTab;
