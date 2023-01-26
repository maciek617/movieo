import { supabase } from '../App';

export const registerUser = async (
  email: string,
  password: string,
  name: string,
  disptach: any,
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
  console.log(data);
  console.log(data.user);

  disptach(updateUser(data.user));
  localStorage.setItem('isLoggedIn', 'true');
  if (!error) navigate('/home');
};
