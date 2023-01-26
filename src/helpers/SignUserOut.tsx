import { supabase } from "../App";

export const signoutUser = async (navigate: any) => {
  const { error } = await supabase.auth.signOut();
  if (!error) navigate('/');
};
