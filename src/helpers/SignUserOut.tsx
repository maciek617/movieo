import { supabase } from '../App';

export const signoutUser = async (
  navigate: any,
  dispatch: any,
  udpateUser: any
) => {
  const { error } = await supabase.auth.signOut();

  if (!error) {
    localStorage.clear();
    dispatch(udpateUser(null));
    navigate('/');
  }
};
