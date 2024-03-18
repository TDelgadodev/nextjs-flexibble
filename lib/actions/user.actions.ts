"use server";

import { CreateUserParams } from "@/types";
import { connectToDatabase } from "../mongoose";
import User from "@/database/user.model";

export const createUser = async (user: CreateUserParams) => {
  try {
    await connectToDatabase();
    console.log(user);
    

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (userId: string) => {
  try {
    await connectToDatabase();
    console.log(userId);
    

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
};
