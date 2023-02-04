import { supabase } from '../App';

export const registerUser = async (
  email: string,
  password: string,
  name: string,
  dispatch: any,
  updateUser: any,
  navigate: any
) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        name: name,
      },
    },
  });

  dispatch(updateUser(data.user));
  localStorage.setItem('isLoggedIn', 'true');
  document.cookie =
    'wasLoggedIn=true; expires=Tue, 14 Feb 2023 12:00:00 UTCl path=/';
  if (!error) navigate('/wait-for-email');
};
