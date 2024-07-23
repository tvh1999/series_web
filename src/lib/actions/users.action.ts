"use server";
import { connectToDatabase } from "../mongoose";
import Users from "@/database/users.model";
import {
  bookmarkParams,
  createUserParams,
  deleteUserParams,
  updateUserParams,
  getSavedSeriesParams,
  getUserBookmarksParams,
  getUserReviewsParams,
  getAccountInfoParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Series from "@/database/series.model";
import { FilterQuery } from "mongoose";
import Reviews from "@/database/reviews.model";

export const findUserByClerkId = async (params: { clerkId: string }) => {
  try {
    await connectToDatabase();
    const { clerkId } = params;
    const userId = await Users.findOne({ clerkId });

    if (!userId)
      throw new Error("There is no such a clerk user in the database");

    const parsingUser = JSON.parse(JSON.stringify(userId));
    return parsingUser;
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};

export const getClerkUserAccountInfo = async (params: getAccountInfoParams) => {
  try {
    // Connect to database
    await connectToDatabase();

    const { userId: clerkId } = params;

    const user = await Users.findOne({ clerkId }).populate({
      path: "bookmarks",
      model: Series,
    });
    if (!user)
      throw new Error(
        "Can not recieve the required user data, please check the value of clerkId again"
      );
    const totalBookmarks = await Series.countDocuments({ isBookmarked: true });
    const totalReviews = await Reviews.countDocuments({ author: user._id });
    const parsedUser = JSON.parse(JSON.stringify(user));
    return { totalBookmarks, totalReviews, userInfo: parsedUser };
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};

export const getUserAccountInfo = async (params: getAccountInfoParams) => {
  try {
    // Connect to database
    await connectToDatabase();

    const { userId } = params;

    const user = await Users.findById(userId).populate({
      path: "bookmarks",
      model: Series,
    });
    if (!user)
      throw new Error(
        "Can not recieve the required user data, please check the value of userId again"
      );
    const parsedUser = JSON.parse(JSON.stringify(user));
    return parsedUser;
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};

export const getUserBookmarks = async (params: getUserBookmarksParams) => {
  try {
    // Connect to database
    await connectToDatabase();

    // eslint-disable-next-line no-unused-vars
    const { userId, page = 1, pageSize = 10 } = params;

    const totalBookmarks = await Series.countDocuments({ isBookmarked: true });
    const bookmarkedList = await Users.findById(userId)
      .select("_id bookmarks")
      .populate({ path: "bookmarks", model: Series });

    if (!bookmarkedList || !totalBookmarks)
      throw new Error(
        "There is something wrong when trying to retrieve the bookmarks list. Please check again the userId"
      );
    const parsedList = JSON.parse(JSON.stringify(bookmarkedList));
    return { dataList: parsedList, totalBookmarks };
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};

export const getUserReviews = async (params: getUserReviewsParams) => {
  try {
    // Connect to database
    await connectToDatabase();

    // eslint-disable-next-line no-unused-vars
    const { userId, page = 1, pageSize = 10 } = params;

    const totalReviews = await Reviews.countDocuments({ author: userId });

    const reviewsList = await Reviews.find({ author: userId })
      .select("content author createdOn title _id")
      .populate({
        path: "author",
        model: Users,
        select: "_id username profileImage",
      })
      .populate({ path: "product", model: Series, select: "_id" });

    if (!totalReviews || !reviewsList)
      throw new Error(
        "There has been an error when attempting to retrieve the reviews of this user. Recheck the userId if needed be"
      );

    const parsedList = JSON.parse(JSON.stringify(reviewsList));
    return { dataList: parsedList, totalReviews };
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};

export const createUser = async (params: createUserParams) => {
  try {
    // Connect to the database
    await connectToDatabase();

    // Create a new user
    const user = await Users.create(params);
    if (!user) throw new Error("Failed to create the user account");
    return user;
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};

export const updateUser = async (params: updateUserParams) => {
  try {
    // Connect to the database
    await connectToDatabase();

    const { clerkId, updateData, path } = params;

    // Update the user
    const user = await Users.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    if (!user) throw new Error("Failed to update the selected user account");
    revalidatePath(path);
    return user;
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};

export const deleteUser = async (params: deleteUserParams) => {
  try {
    // Connect to the database
    await connectToDatabase();

    // delete the user
    const user = await Users.findOneAndDelete(params);
    if (!user) throw new Error("Failed to delete the user");

    // eslint-disable-next-line no-unused-vars
    // const userBookmarkedSeriesIds = await Series.find({
    //   bookmarks: user._id,
    // }).distinct("_id");

    // Delete reviews
    await Reviews.deleteMany({ author: user._id });

    // Delete all of bookmark marks of deleted user account.
    await Series.updateMany({}, { $set: { isBookmarked: false } });

    const usersCount = await Users.countDocuments();

    if (usersCount < 1 && usersCount === 0) {
      await Series.insertMany([
        {
          title: "Beyond Earth",
          thumbnail: {
            trending: {
              small: "/assets/thumbnails/beyond-earth/trending/small.jpg",
              large: "/assets/thumbnails/beyond-earth/trending/large.jpg",
            },
            regular: {
              small: "/assets/thumbnails/beyond-earth/regular/small.jpg",
              medium: "/assets/thumbnails/beyond-earth/regular/medium.jpg",
              large: "/assets/thumbnails/beyond-earth/regular/large.jpg",
            },
          },
          year: 2019,
          category: "Movie",
          rating: "PG",
          isBookmarked: false,
          isTrending: true,
        },
        {
          title: "Bottom Gear",
          thumbnail: {
            trending: {
              small: "/assets/thumbnails/bottom-gear/trending/small.jpg",
              large: "/assets/thumbnails/bottom-gear/trending/large.jpg",
            },
            regular: {
              small: "/assets/thumbnails/bottom-gear/regular/small.jpg",
              medium: "/assets/thumbnails/bottom-gear/regular/medium.jpg",
              large: "/assets/thumbnails/bottom-gear/regular/large.jpg",
            },
          },
          year: 2021,
          category: "Movie",
          rating: "PG",
          isBookmarked: false,
          isTrending: true,
        },
        {
          title: "Undiscovered Cities",
          thumbnail: {
            trending: {
              small:
                "/assets/thumbnails/undiscovered-cities/trending/small.jpg",
              large:
                "/assets/thumbnails/undiscovered-cities/trending/large.jpg",
            },
            regular: {
              small: "/assets/thumbnails/undiscovered-cities/regular/small.jpg",
              medium:
                "/assets/thumbnails/undiscovered-cities/regular/medium.jpg",
              large: "/assets/thumbnails/undiscovered-cities/regular/large.jpg",
            },
          },
          year: 2019,
          category: "TV Series",
          rating: "E",
          isBookmarked: false,
          isTrending: true,
        },
        {
          title: "1998",
          thumbnail: {
            trending: {
              small: "/assets/thumbnails/1998/trending/small.jpg",
              large: "/assets/thumbnails/1998/trending/large.jpg",
            },
            regular: {
              small: "/assets/thumbnails/1998/regular/small.jpg",
              medium: "/assets/thumbnails/1998/regular/medium.jpg",
              large: "/assets/thumbnails/1998/regular/large.jpg",
            },
          },
          year: 2021,
          category: "Movie",
          rating: "18+",
          isBookmarked: false,
          isTrending: true,
        },
        {
          title: "Dark Side of the Moon",
          thumbnail: {
            trending: {
              small:
                "/assets/thumbnails/dark-side-of-the-moon/trending/small.jpg",
              large:
                "/assets/thumbnails/dark-side-of-the-moon/trending/large.jpg",
            },
            regular: {
              small:
                "/assets/thumbnails/dark-side-of-the-moon/regular/small.jpg",
              medium:
                "/assets/thumbnails/dark-side-of-the-moon/regular/medium.jpg",
              large:
                "/assets/thumbnails/dark-side-of-the-moon/regular/large.jpg",
            },
          },
          year: 2018,
          category: "TV Series",
          rating: "PG",
          isBookmarked: true,
          isTrending: true,
        },
        {
          title: "The Great Lands",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/the-great-lands/regular/small.jpg",
              medium: "/assets/thumbnails/the-great-lands/regular/medium.jpg",
              large: "/assets/thumbnails/the-great-lands/regular/large.jpg",
            },
          },
          year: 2019,
          category: "Movie",
          rating: "E",
          isBookmarked: false,
          isTrending: false,
        },
        {
          title: "The Diary",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/the-diary/regular/small.jpg",
              medium: "/assets/thumbnails/the-diary/regular/medium.jpg",
              large: "/assets/thumbnails/the-diary/regular/large.jpg",
            },
          },
          year: 2019,
          category: "TV Series",
          rating: "PG",
          isBookmarked: false,
          isTrending: false,
        },
        {
          title: "Earth’s Untouched",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/earths-untouched/regular/small.jpg",
              medium: "/assets/thumbnails/earths-untouched/regular/medium.jpg",
              large: "/assets/thumbnails/earths-untouched/regular/large.jpg",
            },
          },
          year: 2017,
          category: "Movie",
          rating: "18+",
          isBookmarked: true,
          isTrending: false,
        },
        {
          title: "No Land Beyond",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/no-land-beyond/regular/small.jpg",
              medium: "/assets/thumbnails/no-land-beyond/regular/medium.jpg",
              large: "/assets/thumbnails/no-land-beyond/regular/large.jpg",
            },
          },
          year: 2019,
          category: "Movie",
          rating: "E",
          isBookmarked: false,
          isTrending: false,
        },
        {
          title: "During the Hunt",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/during-the-hunt/regular/small.jpg",
              medium: "/assets/thumbnails/during-the-hunt/regular/medium.jpg",
              large: "/assets/thumbnails/during-the-hunt/regular/large.jpg",
            },
          },
          year: 2016,
          category: "TV Series",
          rating: "PG",
          isBookmarked: false,
          isTrending: false,
        },
        {
          title: "Autosport the Series",
          thumbnail: {
            regular: {
              small:
                "/assets/thumbnails/autosport-the-series/regular/small.jpg",
              medium:
                "/assets/thumbnails/autosport-the-series/regular/medium.jpg",
              large:
                "/assets/thumbnails/autosport-the-series/regular/large.jpg",
            },
          },
          year: 2016,
          category: "TV Series",
          rating: "18+",
          isBookmarked: false,
          isTrending: false,
        },
        {
          title: "Same Answer II",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/same-answer-2/regular/small.jpg",
              medium: "/assets/thumbnails/same-answer-2/regular/medium.jpg",
              large: "/assets/thumbnails/same-answer-2/regular/large.jpg",
            },
          },
          year: 2017,
          category: "Movie",
          rating: "E",
          isBookmarked: false,
          isTrending: false,
        },
        {
          title: "Below Echo",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/below-echo/regular/small.jpg",
              medium: "/assets/thumbnails/below-echo/regular/medium.jpg",
              large: "/assets/thumbnails/below-echo/regular/large.jpg",
            },
          },
          year: 2016,
          category: "TV Series",
          rating: "PG",
          isBookmarked: false,
          isTrending: false,
        },
        {
          title: "The Rockies",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/the-rockies/regular/small.jpg",
              medium: "/assets/thumbnails/the-rockies/regular/medium.jpg",
              large: "/assets/thumbnails/the-rockies/regular/large.jpg",
            },
          },
          year: 2015,
          category: "TV Series",
          rating: "E",
          isBookmarked: true,
          isTrending: false,
        },
        {
          title: "Relentless",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/relentless/regular/small.jpg",
              medium: "/assets/thumbnails/relentless/regular/medium.jpg",
              large: "/assets/thumbnails/relentless/regular/large.jpg",
            },
          },
          year: 2017,
          category: "Movie",
          rating: "PG",
          isBookmarked: true,
          isTrending: false,
        },
        {
          title: "Community of Ours",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/community-of-ours/regular/small.jpg",
              medium: "/assets/thumbnails/community-of-ours/regular/medium.jpg",
              large: "/assets/thumbnails/community-of-ours/regular/large.jpg",
            },
          },
          year: 2018,
          category: "TV Series",
          rating: "18+",
          isBookmarked: false,
          isTrending: false,
        },
        {
          title: "Van Life",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/van-life/regular/small.jpg",
              medium: "/assets/thumbnails/van-life/regular/medium.jpg",
              large: "/assets/thumbnails/van-life/regular/large.jpg",
            },
          },
          year: 2015,
          category: "Movie",
          rating: "PG",
          isBookmarked: false,
          isTrending: false,
        },
        {
          title: "The Heiress",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/the-heiress/regular/small.jpg",
              medium: "/assets/thumbnails/the-heiress/regular/medium.jpg",
              large: "/assets/thumbnails/the-heiress/regular/large.jpg",
            },
          },
          year: 2021,
          category: "Movie",
          rating: "PG",
          isBookmarked: true,
          isTrending: false,
        },
        {
          title: "Off the Track",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/off-the-track/regular/small.jpg",
              medium: "/assets/thumbnails/off-the-track/regular/medium.jpg",
              large: "/assets/thumbnails/off-the-track/regular/large.jpg",
            },
          },
          year: 2017,
          category: "Movie",
          rating: "18+",
          isBookmarked: true,
          isTrending: false,
        },
        {
          title: "Whispering Hill",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/whispering-hill/regular/small.jpg",
              medium: "/assets/thumbnails/whispering-hill/regular/medium.jpg",
              large: "/assets/thumbnails/whispering-hill/regular/large.jpg",
            },
          },
          year: 2017,
          category: "Movie",
          rating: "E",
          isBookmarked: false,
          isTrending: false,
        },
        {
          title: "112",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/112/regular/small.jpg",
              medium: "/assets/thumbnails/112/regular/medium.jpg",
              large: "/assets/thumbnails/112/regular/large.jpg",
            },
          },
          year: 2013,
          category: "TV Series",
          rating: "PG",
          isBookmarked: false,
          isTrending: false,
        },
        {
          title: "Lone Heart",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/lone-heart/regular/small.jpg",
              medium: "/assets/thumbnails/lone-heart/regular/medium.jpg",
              large: "/assets/thumbnails/lone-heart/regular/large.jpg",
            },
          },
          year: 2017,
          category: "Movie",
          rating: "E",
          isBookmarked: true,
          isTrending: false,
        },
        {
          title: "Production Line",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/production-line/regular/small.jpg",
              medium: "/assets/thumbnails/production-line/regular/medium.jpg",
              large: "/assets/thumbnails/production-line/regular/large.jpg",
            },
          },
          year: 2018,
          category: "TV Series",
          rating: "PG",
          isBookmarked: false,
          isTrending: false,
        },
        {
          title: "Dogs",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/dogs/regular/small.jpg",
              medium: "/assets/thumbnails/dogs/regular/medium.jpg",
              large: "/assets/thumbnails/dogs/regular/large.jpg",
            },
          },
          year: 2016,
          category: "TV Series",
          rating: "E",
          isBookmarked: true,
          isTrending: false,
        },
        {
          title: "Asia in 24 Days",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/asia-in-24-days/regular/small.jpg",
              medium: "/assets/thumbnails/asia-in-24-days/regular/medium.jpg",
              large: "/assets/thumbnails/asia-in-24-days/regular/large.jpg",
            },
          },
          year: 2020,
          category: "TV Series",
          rating: "PG",
          isBookmarked: false,
          isTrending: false,
        },
        {
          title: "The Tasty Tour",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/the-tasty-tour/regular/small.jpg",
              medium: "/assets/thumbnails/the-tasty-tour/regular/medium.jpg",
              large: "/assets/thumbnails/the-tasty-tour/regular/large.jpg",
            },
          },
          year: 2016,
          category: "TV Series",
          rating: "PG",
          isBookmarked: false,
          isTrending: false,
        },
        {
          title: "Darker",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/darker/regular/small.jpg",
              medium: "/assets/thumbnails/darker/regular/medium.jpg",
              large: "/assets/thumbnails/darker/regular/large.jpg",
            },
          },
          year: 2017,
          category: "Movie",
          rating: "18+",
          isBookmarked: true,
          isTrending: false,
        },
        {
          title: "Unresolved Cases",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/unresolved-cases/regular/small.jpg",
              medium: "/assets/thumbnails/unresolved-cases/regular/medium.jpg",
              large: "/assets/thumbnails/unresolved-cases/regular/large.jpg",
            },
          },
          year: 2018,
          category: "TV Series",
          rating: "18+",
          isBookmarked: false,
          isTrending: false,
        },
        {
          title: "Mission: Saturn",
          thumbnail: {
            regular: {
              small: "/assets/thumbnails/mission-saturn/regular/small.jpg",
              medium: "/assets/thumbnails/mission-saturn/regular/medium.jpg",
              large: "/assets/thumbnails/mission-saturn/regular/large.jpg",
            },
          },
          year: 2017,
          category: "Movie",
          rating: "PG",
          isBookmarked: true,
          isTrending: false,
        },
      ]);
    }

    // Delete answers, comments and more...
    // const deletedUser = await Users.findByIdAndDelete(user._id);
    // return deletedUser;
    // return user;
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};

export const userBookmark = async (params: bookmarkParams) => {
  try {
    // Connect to database
    await connectToDatabase();

    const { userId, seriesId, path } = params;

    let updateQueryUserSide = {};
    let updateQuerySeriesSide = {};
    const user = await Users.findById(userId);
    if (user.bookmarks.includes(seriesId)) {
      updateQuerySeriesSide = { isBookmarked: false };
      updateQueryUserSide = { $pull: { bookmarks: seriesId } };
    } else {
      updateQuerySeriesSide = { isBookmarked: true };
      updateQueryUserSide = { $push: { bookmarks: seriesId } };
    }

    await Series.findByIdAndUpdate(seriesId, updateQuerySeriesSide);

    const toggleBookmark = await Users.findByIdAndUpdate(
      userId,
      updateQueryUserSide,
      {
        new: true,
      }
    );
    if (!toggleBookmark) throw new Error("Failed to toggle the bookmark");
    revalidatePath(path);
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};

export const getUserSavedSeriesById = async (params: getSavedSeriesParams) => {
  try {
    // Connect to database
    await connectToDatabase();

    // eslint-disable-next-line no-unused-vars
    const { clerkId, page = 1, pageSize = 10, searchQuery = "" } = params;

    // Ta đang ra điều kiện cho giá trị regular expression của query.
    // Nếu searchQuery có giá trị thì cho nó tìm kiếm các documents có title bằng với giá trị searchQuery
    // Còn nếu không có thì là object rỗng để lấy ra mọi documents.
    const query: FilterQuery<typeof Series> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};

    // Cái cần lưu tâm ở đây là thuộc tính match nằm bên trong method populate().
    // Về cơ bản là nó đang mọi document được populate sẽ phải thỏa mãn điều kiện của query.
    // trước khi được populate.
    // Đây là cách duy nhất để chúng ta có thể lọc ra các documents ngay từ khi chúng còn đang ở giai đoạn populate mà không phải đi tạo thêm một method mongoose khác.
    const user = await Users.findOne({ clerkId }).populate({
      path: "bookmarks",
      match: query,
      options: { sort: { createdAt: -1 } },
      populate: [{ path: "reviews", model: Users }],
    });

    // Còn lại thì như cũ
    const series = user.bookmarks;
    const parsingSeries = JSON.parse(JSON.stringify(series));
    if (!parsingSeries)
      throw new Error("Can not get the user bookmarked series");
    return parsingSeries;
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};
