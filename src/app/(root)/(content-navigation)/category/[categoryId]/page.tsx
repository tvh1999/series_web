import React from "react";
import LocalSearchBar from "@/components/shared/SearchBar/LocalSearchBar";
import SeriesList from "@/components/shared/SeriesList/SeriesList";
import { getSeriesFromDB } from "@/lib/actions/series.action";

interface IParamsProps {
  [id: string]: string;
}

const CategoryPage = async ({ params }: { params: IParamsProps }) => {
  const { categoryId } = params;
  const category = categoryId === "movie" ? "Movie" : "TV Series";
  const getSeriesBasedOnCategoryPage = await getSeriesFromDB({
    category,
  });
  return (
    <div>
      <LocalSearchBar placeHolder={`Search for ${category}...`} />
      <SeriesList data={getSeriesBasedOnCategoryPage!} />
    </div>
  );
};

export default CategoryPage;
