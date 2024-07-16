"use server";
import Series from "@/database/series.model";
import { connectToDatabase } from "../mongoose";
import { GlobalSearchParams } from "./shared.types";
import Users from "@/database/users.model";
import Reviews from "@/database/reviews.model";

export const globalSearch = async (searchParams: GlobalSearchParams) => {
  try {
    // connect to the database
    await connectToDatabase();
    const { searchQuery, type } = searchParams;
    const authorizedTypes = ["series", "user", "review"];
    const modelsAndSearchFields = [
      { model: Series, searchField: "title", type: "series" },
      { model: Users, searchField: "name", type: "user" },
      { model: Reviews, searchField: "title", type: "review" },
    ];

    const results = [];

    const queryLogic = { $regex: searchQuery, $options: "i" };
    const typeLower = type?.toLowerCase();

    // Search everything
    if (searchQuery && !type) {
      for (const { model, searchField, type } of modelsAndSearchFields) {
        const res = await model.find({ [searchField]: queryLogic }).limit(2);
        const data = res.map((obj: any) => ({
          id:
            type === "series"
              ? obj._id
              : type === "user"
                ? obj.clerkId
                : obj.product,
          title:
            type === "review"
              ? `Reviews contain ${searchQuery}`
              : obj[searchField],
          type,
        }));
        const parsedData = JSON.parse(JSON.stringify(data));
        results.push(...parsedData);
      }
    }

    // Search based on choosen type
    if (searchQuery && authorizedTypes.includes(typeLower!)) {
      const typeToSearch = modelsAndSearchFields.find(
        (item) => item.type === typeLower
      );
      if (!typeToSearch) throw new Error("invalid searchField");
      const res = await typeToSearch.model
        .find({ [typeToSearch.searchField]: queryLogic })
        .limit(2);

      const data = res.map((obj: any) => ({
        id:
          type === "series"
            ? obj._id
            : type === "user"
              ? obj.clerkId
              : obj.product,
        title:
          type === "review"
            ? `Reviews contain ${searchQuery}`
            : obj[typeToSearch.searchField],
        type,
      }));

      const parsedData = JSON.parse(JSON.stringify(data));
      results.push(...parsedData);
    }

    return results;
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};
