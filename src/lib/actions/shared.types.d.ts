export interface getSeriesParams {
  category?: string;
  searchQuery?: string;
  sort?: string;
  isTrending?: boolean;
  isBookmarked?: boolean;
}

export interface createUserParams {
  clerkId?: string;
  name: string;
  email?: string;
  profileImage?: string;
  username: string;
  createdOn: Date;
}

export interface getSeriesBasedOnItsIdParams {
  seriesId: string;
}

export interface updateUserParams {
  clerkId: string;
  updateData: {
    name: string;
    username: string;
    email?: string;
    profileImage?: string;
    location?: string;
    description?: string;
    createdOn?: Date;
  };
  path: string;
}

export interface deleteUserParams {
  clerkId: string;
}

export interface bookmarkParams {
  userId?: string;
  seriesId: string;
  path: string;
}

export interface getSavedSeriesParams {
  clerkId: string;
  page?: string;
  pageSize?: string;
  searchQuery?: string;
}

export interface createReviewsParams {
  userId: string;
  seriesId: string;
  title: string;
  content: string;
  path: string;
}

export interface getAllReviewsParams {
  seriesId: string;
  sortOrder?: "newest" | "oldest";
}

export interface getUserBookmarksParams {
  userId: string;
  page?: number;
  pageSize?: number;
}

export interface getUserReviewsParams {
  userId: string;
  page?: number;
  pageSize?: number;
}

export interface getAccountInfoParams {
  userId: string;
}

export interface updateReviewParams {
  reviewId: string;
  title: string;
  content: string;
  path: string;
}

export interface deleteReviewsParams {
  seriesId: string;
  reviewId: string;
  path: string;
}

export interface getOneReviewParams {
  reviewId: string;
}
