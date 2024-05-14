import React from "react";
import SearchBar from "@/components/shared/SearchBar/SearchBar";

const Page = ({ params }: { params: any }) => {
  const { categoryId } = params;
  return (
    <div>
      <SearchBar placeHolder={`Search for ${categoryId}...`} />
    </div>
  );
};

export default Page;
