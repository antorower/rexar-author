import dbConnect from "./dbConnect";
import User from "@/models/User";
import Book from "@/models/Book";
import { redis } from "./redis";
import { auth } from "@clerk/nextjs/server";

export const GetCurrentUser = async () => {
  try {
    const { sessionClaims } = await auth();
    if (!sessionClaims) throw new Error("No session claims found");

    const redisUser = await redis.get(`user:${sessionClaims.userId}`);
    if (redisUser) return redisUser;

    await dbConnect();
    const user = await User.findOne({ clerkId: sessionClaims.userId }).lean();
    if (user) {
      await redis.set(`user:${sessionClaims.userId}`, user, { ex: 86400 });
      return user;
    } else {
      const newUser = new User({ clerkId: sessionClaims.userId, username: sessionClaims.username });
      await newUser.save();
      await redis.set(`user:${sessionClaims.userId}`, newUser, { ex: 86400 });
      return newUser;
    }
  } catch (error) {
    console.error("Error in GetCurrentUser: ", error);
    throw error;
  }
};

export async function GetBooks(params = {}) {
  try {
    const user = await GetCurrentUser();
    const { page = 1, limit = 20, category, status } = params;

    await dbConnect();

    const query = {
      source: "original",
      author: user._id,
    };

    if (category) {
      query.category = category;
    }

    if (status) {
      query.status = status;
    }

    const currentPage = Math.max(Number(page) || 1, 1);
    const perPage = Math.max(Number(limit) || 10, 1);
    const skip = (currentPage - 1) * perPage;

    const [books, total] = await Promise.all([Book.find(query).select("title description cover category status price slug").sort({ createdAt: -1 }).skip(skip).limit(perPage).lean(), Book.countDocuments(query)]);

    const totalPages = Math.ceil(total / perPage);

    return {
      success: true,
      data: books,
      pagination: {
        total,
        totalPages,
        currentPage,
        limit: perPage,
      },
    };
  } catch (error) {
    console.error("GetBooks error:", error);
    return {
      success: false,
      error: "Κάτι πήγε στραβά κατά την ανάκτηση των βιβλίων.",
    };
  }
}

export const TotalBooks = async () => {
  await dbConnect();
  const user = await GetCurrentUser();
  if (!user) return 0;
  const count = await Book.countDocuments({ author: user._id });
  return count;
};

export const TotalBooksThisMonth = async () => {
  await dbConnect();
  const user = await GetCurrentUser();
  if (!user) return 0;

  // Υπολογισμός αρχής και τέλους του μήνα
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  // Count based on createdAt range + author
  const count = await Book.countDocuments({
    author: user._id,
    createdAt: {
      $gte: startOfMonth,
      $lt: endOfMonth,
    },
  });

  return count;
};

export const GetBookById = async (id) => {
  await dbConnect();
  return await Book.findById(id).lean();
};

export const GetBookBySlug = async (slug, prompts) => {
  await dbConnect();
  const book = prompts ? await await Book.findOne({ slug: slug }).select("+contentPrompt +lessonPrompt") : await Book.findOne({ slug: slug });
  return book;
};
