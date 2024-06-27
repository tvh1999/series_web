import React from "react";
import { getUserBookmarks } from "@/lib/actions/users.action";
import SeriesList from "../SeriesList/SeriesList";

const BookmarksTab = async ({ userId }: { userId: string }) => {
  const { dataList } = (await getUserBookmarks({ userId })) as {
    dataList: { _id: string; bookmarks: any[] };
  };

  return <SeriesList data={dataList.bookmarks} />;
};

export default BookmarksTab;
