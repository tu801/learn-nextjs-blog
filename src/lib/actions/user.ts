import { ClerkUserData } from "@/types/clerk";
import User from "../models/user.model";
import { connect } from "../mongodb/mongoose";

export const createOrUpdateUser = async (inputUser: ClerkUserData) => {
  try {
    await connect();
    const user = await User.findOneAndUpdate(
      {
        clerkId: inputUser.id,
      },
      {
        $set: {
          firstName: inputUser.first_name,
          lastName: inputUser.last_name,
          profilePicture: inputUser.image_url,
          email: inputUser.email_address,
          username: inputUser.username,
        },
      },
      { new: true, upsert: true }
    );
    return user;
  } catch (error) {
    console.error("Error creating new User in MongoDB!", error);
  }
};

export const deleteUser = async (id: string) => {
  try {
    await connect();
    await User.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.error("Error when Delete User!", error);
  }
};
