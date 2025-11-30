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

export const GetBookById = async (id) => {
  await dbConnect();
  return await Book.findById(id).lean();
};
