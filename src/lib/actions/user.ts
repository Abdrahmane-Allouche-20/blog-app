import User from "../models/user";
import { Connect } from "../mongodb/mongoose";

export const createOrUpdate = async (
  id: string, 
  username: string, 
  first_name: string, 
  Last_name: string, 
  image_url: string, 
  email_addresses: { email_address: string }[]
) => {
  try {
    await Connect();

    const user = await User.findOneAndUpdate(
      { ClerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: Last_name,
          email: email_addresses[0]?.email_address || "", // Prevents errors if array is empty
          profilePicture: image_url,
          username,
        },
      },
      { new: true, upsert: true } // Fixed `upset: true`
    );

    return user;
  } catch (error) {
    console.error("Error in createOrUpdate:", error);
    throw error; // Re-throw the error for better debugging
  }
};
export const DeleteUser=async(id:string)=>{
    try {
        await Connect()
        await User.findOneAndDelete({ClerkId:id})
    } catch (error) {
        console.log(error)
    }
   
}