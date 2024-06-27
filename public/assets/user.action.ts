/* eslint-disable no-unused-vars */
"use server";
import { FilterQuery } from "mongoose";
import { connectToDatabase } from "../mongoose";
import User from "@/database/user.model";
import {
  getUserByClerkIdParams,
  CreateUserParams,
  UpdateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  ToggleSaveQuestionParams,
  GetSavedQuestionsParams,
  GetUserStatsParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import Answer from "@/database/answer.model";

export const getUserByClerkId = async (params: getUserByClerkIdParams) => {
  try {
    // Kết nối tới database
    await connectToDatabase();

    // Trích xuất id người dùng thông qua kỹ thuật object destructuring.
    const { userId } = params;

    // Dùng method findOne() để tìm ra một document với thông tin người dùng trùng khớp với id người dùng được truyền vào.
    const user = await User.findOne({ clerkId: userId });
    if (!user) throw new Error("There is no such user in database");
    const resultUser = JSON.parse(JSON.stringify(user));
    return resultUser;
  } catch (error) {
    if (error instanceof Error) return console.error(error.message);
  }
};

export const getUserInfoById = async (params: getUserByClerkIdParams) => {
  try {
    // Connect to database
    await connectToDatabase();
    const { userId } = params;

    const originalUser = await User.findOne({ clerkId: userId });
    if (!originalUser) throw new Error("There is no such user in database");
    const totalQuestions = await Question.countDocuments({
      author: originalUser._id,
    });
    const totalAnswers = await Answer.countDocuments({
      author: originalUser._id,
    });
    const user = JSON.parse(JSON.stringify(originalUser));
    // console.log({ originalUser });
    return { totalAnswers, totalQuestions, user };
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};

export const getUserQuestions = async (questionParams: GetUserStatsParams) => {
  try {
    // Connect to database
    await connectToDatabase();

    const { userId, page = 10, pageSize = 10 } = questionParams;

    // Find the questions created by the user that we have just received
    const questions = await Question.find({ author: userId })
      .populate({ path: "author", model: User, select: "name username" })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name username picture",
      })
      .populate({ path: "tags", model: Tag, select: "_id name" })
      .sort({ views: -1, upvotes: -1 });

    if (!questions) throw new Error("Questions not found");

    const totalQuestions = await Question.countDocuments({ author: userId });
    const parsingQuestions = JSON.parse(JSON.stringify(questions));

    return { questions: parsingQuestions, totalQuestions };
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};

export const getUserAnswers = async (answerParams: GetUserStatsParams) => {
  try {
    // Connect to database
    await connectToDatabase();

    const { userId, page = 1, pageSize = 10 } = answerParams;

    // Count the number of answers made by the user
    const totalAnswers = await Answer.countDocuments({ author: userId });

    // Find all the answer documents made by the user account
    const answers = await Answer.find({ author: userId })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture username",
      })
      .populate({ path: "question", model: Question, select: "title _id" })
      .sort({ createdAt: -1, upvotes: -1 });

    if (!answers) throw new Error("Answers not found");
    const parsedAnswer = JSON.parse(JSON.stringify(answers));
    return { answers: parsedAnswer, totalAnswers };
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};

export const testCreateNewUser = async (userParams: CreateUserParams) => {
  try {
    await connectToDatabase();
    const newUser = await User.create(userParams);
    if (!newUser)
      throw new Error("There is a problem creating Clerk user in database");
    // console.log(newUser);
  } catch (err: unknown) {
    if (err instanceof Error) return console.error(err.message);
  }
};

// export interface CreateUserParams {
//   clerkId: string;
//   name: string;
//   username: string;
//   email: string;
//   picture: string;
// }

export const createUser = async (userParams: CreateUserParams) => {
  try {
    // Kết nối tới database
    await connectToDatabase();

    // Trích xuất id người dùng thông qua kỹ thuật object destructuring.
    // const { clerkId, name, username, email, picture } = userParams;

    const user = await User.create(userParams);

    if (!user) throw new Error("There is no such Clerk user in database");
    return user;
  } catch (error) {
    if (error instanceof Error) return console.error(error.message);
  }
};

// export interface UpdateUserParams {
//   clerkId: string;
//   updateData: Partial<IUser>;
//   path: string;
// }
export const updateUser = async (userParams: UpdateUserParams) => {
  try {
    // Kết nối tới database
    await connectToDatabase();

    // Trích xuất id người dùng thông qua kỹ thuật object destructuring.
    const { clerkId, updateData, path } = userParams;

    await User.findOneAndUpdate(
      {
        clerkId,
      },
      updateData,
      {
        new: true,
      }
    );

    revalidatePath(path);
  } catch (error) {
    if (error instanceof Error) return console.error(error.message);
  }
};

// export interface DeleteUserParams {
//   clerkId: string;
// }

export const deleteUser = async (userParams: DeleteUserParams) => {
  try {
    // Kết nối tới database
    await connectToDatabase();

    // Trích xuất id người dùng thông qua kỹ thuật object destructuring.
    const { clerkId } = userParams;

    const user = await User.findOneAndDelete({
      clerkId,
    });

    if (!user)
      throw new Error("There is no user exist in the database to delete");

    // Delete user from database
    // Delete questions, comments, answers, tags, and followers

    // Get user quesions ids
    // eslint-disable-next-line no-unused-vars
    const userQuestionsIds = await Question.find({ author: user._id }).distinct(
      "_id"
    );

    // Delete questions
    await Question.deleteMany({ author: user._id });

    // Delete answers, comments and more...
    const deletedUser = await User.findByIdAndDelete(user._id);
    return deletedUser;
  } catch (error) {
    if (error instanceof Error) return console.error(error.message);
  }
};

export const getAllUser = async (userParams: GetAllUsersParams) => {
  try {
    // Connect to database
    await connectToDatabase();

    // const {
    //   page = 1,
    //   pageSize = 20,
    //   filter ,
    //   searchQuery,
    // } = userParams;

    const users = await User.find(userParams)
      .populate({
        path: "saved",
        model: Question,
      })
      .sort({ joinedAt: -1 });
    if (!users)
      throw new Error(
        "There is an error when attempting to get users in database"
      );
    return users;
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};

export const toggleSaveQuestion = async (
  userParams: ToggleSaveQuestionParams
) => {
  try {
    // connect to database
    await connectToDatabase();

    const { userId, questionId, path } = userParams;

    const user = await User.findById(userId);
    let updateQuery = {};

    if (user.saved.includes(questionId)) {
      updateQuery = { $pull: { saved: questionId } };
    } else {
      updateQuery = { $push: { saved: questionId } };
    }

    const saveQuestion = await User.findByIdAndUpdate(userId, updateQuery, {
      new: true,
    });

    if (!saveQuestion)
      throw new Error(
        "There is an error when attempting to save question in database"
      );

    revalidatePath(path);
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};

export const getSavedQuestions = async (
  userParams: GetSavedQuestionsParams
) => {
  try {
    // connect to database
    await connectToDatabase();

    const {
      clerkId,
      page = 1,
      pageSize = 20,
      filter = "",
      searchQuery = "",
    } = userParams;

    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};

    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      options: { sort: { createdAt: -1 } },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        {
          path: "author",
          model: User,
          select: "_id clerkId name picture",
        },
      ],
    });
    // console.log(user);
    if (!user)
      throw new Error(
        "There is an error when attempting to get saved questions in database"
      );

    const savedQuestions = user.saved;

    const parsedSavedQuestions = JSON.parse(JSON.stringify(savedQuestions));
    return { questions: parsedSavedQuestions };
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};
