import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookmarksTab from "./BookmarksTab";
import ReviewsTab from "./ReviewsTab";

interface AccountTabsProps {
  userId: string;
}

const AccountTabs = ({ userId }: AccountTabsProps) => {
  return (
    <Tabs defaultValue="bookmarks" className="mt-8 w-full max-w-full">
      <TabsList>
        <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      <TabsContent value="bookmarks">
        <BookmarksTab userId={userId} />
      </TabsContent>
      <TabsContent value="reviews">
        <ReviewsTab userId={userId} />
      </TabsContent>
    </Tabs>
  );
};

export default AccountTabs;
