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
  if (data.user) {
    dispatch(updateUser(data.user));

    localStorage.setItem('isLoggedIn', 'true');
    document.cookie =
      'wasLoggedIn=true; expires=Mon, 01 Feb 2024 12:00:00 UTCl path=/';
  }

  if (!error) navigate('/wait-for-email');
};
