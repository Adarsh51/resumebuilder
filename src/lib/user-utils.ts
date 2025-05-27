import { currentUser } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";

export async function createUserInSupabase() {
  const user = await currentUser();
  
  if (!user) {
    throw new Error("No authenticated user found");
  }
  
  // Check if user already exists in Supabase
  const { data: existingUser, error: fetchError } = await supabase
    .from('users')
    .select('*')
    .eq('clerk_user_id', user.id)
    .single();
    
  if (fetchError && fetchError.code !== 'PGRST116') {
    // PGRST116 means no rows returned, which is expected if user doesn't exist
    console.error("Error checking for existing user:", fetchError);
    throw new Error("Failed to check for existing user");
  }
  
  // If user doesn't exist, create them
  if (!existingUser) {
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          email: user.emailAddresses[0].emailAddress,
          clerk_user_id: user.id
        }
      ])
      .select()
      .single();
      
    if (error) {
      console.error("Error creating user in Supabase:", error);
      throw new Error("Failed to create user in database");
    }
    
    return data;
  }
  
  return existingUser;
}
