import { supabase } from '../App';

export const signoutUser = async (
  navigate: any,
  dispatch: any,
  updateUser: any
) => {
  const { error } = await supabase.auth.signOut();
  if (error) return;

  // Add last active update to database
  localStorage.clear();
  navigate('/');
  dispatch(updateUser(null));
};
