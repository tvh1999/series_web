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
    email: string;
    profileImage: string;
    username: string;
    createdOn: Date;
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
  content: string;
  path: string;
}

export interface getAllReviewsParams {
  seriesId: string;
  sortOrder?: "newest" | "oldest";
}
