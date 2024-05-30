export interface getSeriesParams {
  category?: string;
  searchQuery?: string;
  sort?: string;
  isTrending?: boolean;
}

export interface createUserParams {
  clerkId?: string;
  name: string;
  email?: string;
  profileImage?: string;
  username: string;
  createdOn: Date;
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
