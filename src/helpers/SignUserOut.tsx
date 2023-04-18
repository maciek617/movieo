import { supabase } from '../App';

export const signoutUser = async (
  navigate: any,
  dispatch: any,
  updateUser: any,
  id: string
) => {
  const updateIsActive = async () => {
    const { error } = await supabase
      .from('users')
      .update({ isActive: false })
      .eq('id', id);

    console.log(error);

    return error;
  };

  await updateIsActive();

  const { error } = await supabase.auth.signOut();
  if (error) return;
  // Add last active update to database
  localStorage.clear();
  navigate('/');
  dispatch(updateUser(null));
  console.log('hell yeah');
  
};
