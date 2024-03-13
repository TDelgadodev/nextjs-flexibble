import User from "../lib/database/schema/user.model";
import { connectToDatabase } from "../lib/database/mongoose";

export const createUser = async (
  name: string,
  email: string,
  avatarUrl: string
) => {
  try {
    // Conectarse a la base de datos
    await connectToDatabase();

    const result = await User.create({
      name,
      email,
      avatarUrl
    });

    return result;
  } catch (err) {
    console.log("Error", err);
    throw err;
  }
};

export const getUser = async (email: string) => {
  try {
    await connectToDatabase();
    
    
    const user = await User.findOne({ email: email });

    return user;
  } catch (err) {
    console.log("Error", err);
    throw err;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    await connectToDatabase();    

    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
