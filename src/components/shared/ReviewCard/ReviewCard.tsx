import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ParsedHTML from "../ParsedHTML/ParsedHTML";
import { getTimeSince } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import EditAndDeleteAction from "../EditAndDeleteAction/EditAndDeleteAction";

// interface Props {
//   content: string;
//   title: string;
//   date: Date | string;
// }

const ReviewCard = ({ review }: { review: any }) => {
  const {
    _id,
    product,
    content,
    title,
    createdOn,
    author: { username, profileImage },
  } = review;
  const getFormatedTime = getTimeSince(createdOn);
  return (
    <Link href={`/series/${product._id}/#${_id}`}>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-between">
              <div className="mb-4 flex items-center gap-x-1">
                <div className="size-7 rounded-full">
                  <Image
                    src={profileImage}
                    width={30}
                    height={30}
                    alt={`profile image of ${username}`}
                    className="size-auto rounded-full object-contain"
                  />
                </div>
                <p>{username}</p>
              </div>
              <div>
                <p className="mb-4">{getFormatedTime}</p>
                <div className="flex gap-x-2">
                  <EditAndDeleteAction
                    seriesId={product._id}
                    reviewId={_id}
                    type="edit"
                  />
                  <EditAndDeleteAction
                    seriesId={product._id}
                    reviewId={_id}
                    type="delete"
                  />
                </div>
              </div>
            </div>
            <ParsedHTML data={title} isTitle={true} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ParsedHTML data={content} />
        </CardContent>
      </Card>
    </Link>
  );
};

export default ReviewCard;
