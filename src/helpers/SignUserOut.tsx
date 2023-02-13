import { supabase } from '../App';

export const signoutUser = async (
  navigate: any,
  dispatch: any,
  updateUser: any
) => {
  const { error } = await supabase.auth.signOut();
  if (error) return;

  localStorage.clear();
  navigate('/');
  dispatch(updateUser(null));
};
