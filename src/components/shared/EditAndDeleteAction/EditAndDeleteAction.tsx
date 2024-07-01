"use client";
import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { deleteReviews } from "@/lib/actions/reviews.action";

interface EditAndDeleteProps {
  reviewId: string;
  seriesId: string;
  type: "edit" | "delete";
}

const EditAndDeleteAction = ({
  reviewId,
  seriesId,
  type,
}: EditAndDeleteProps) => {
  const router = useRouter();
  const path = usePathname();
  return (
    <>
      <Image
        src={type === "edit" ? "/assets/edit.svg" : "/assets/trash.svg"}
        width={20}
        height={20}
        alt={`${type} button`}
        onClick={(e) => {
          if (e.defaultPrevented) return;
          e.preventDefault();
          if (type === "delete") deleteReviews({ reviewId, seriesId, path });
          else router.push(`/review/edit/${reviewId}`);
        }}
      />
    </>
  );
};

export default EditAndDeleteAction;
