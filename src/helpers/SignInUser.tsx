import { supabase } from '../App';

export const signInUser = async (
  email: string,
  password: string,
  dispatch: any,
  updateUser: any,
  navigate: any
) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  const updateUserLastActive = async () => {
    const { error } = await supabase
      .from('users')
      .update({ last_active: new Date() })
      .eq('id', data.user?.id);

      console.log('work');
      
  };

  dispatch(updateUser(data.user));
  await updateUserLastActive();

  localStorage.setItem('isLoggedIn', 'true');
  document.cookie =
    'wasLoggedIn=true; expires=Mon, 01 Feb 2024 12:00:00 UTCl path=/';
  if (!error) navigate('/home');
};
