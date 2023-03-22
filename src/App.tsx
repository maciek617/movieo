import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PagesLinks from './pages/PagesLinks';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

export const supabase = createClient(
  'https://uzlcyjmxvoczytwcmscx.supabase.co',
  import.meta.env.VITE_SUPABASE_API_KEY
);

function App() {
  const [userExist, setUserExist] = useState<boolean>(false);
  const currentUser = useSelector((state: any) => state.currentUser.value);
  const location = useLocation();

  const getData = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .eq('id', currentUser?.id);

    data?.length === 0 ? setUserExist(true) : setUserExist(false);

    return error;
  };

  const insertData = async () => {
    if (!currentUser?.id) return;

    if (userExist) {
      const { error } = await supabase.from('users').insert({
        id: currentUser?.id,
        created_at: currentUser?.created_at,
        name: currentUser?.user_metadata.name,
        email: currentUser?.email,
        provider: currentUser?.app_metadata.provider,
        last_update: currentUser?.updated_at,
        liked_movies: [],
        last_comment: [],
        badge: 'User',
        date_to_next_generation: null,
        last_active: new Date(),
        image: null,
        brief: 'You can add brief in update profile page.',
        post_length: 0,
        comments_length: 0,
        facebook: 'https://www.facebook.com',
        instagram: 'https://www.instagram.com',
        twitter: 'https://www.twitter.com',
        tiktok: 'https://www.tiktok.com',
      });

      localStorage.setItem('user_created', 'true');
      return error;
    }
  };

  useEffect(() => {
    return () => {
      window.scrollTo(0, 0);
    };
  }, [location]);

  useEffect(() => {
    if (!currentUser?.confirmed_at || !localStorage.getItem('user_created')) {
      getData();
      insertData();
    }
  }, []);

  return (
    <div className='App'>
      <PagesLinks />
      <Navigation user={currentUser} />
      <Footer />
    </div>
  );
}

export default App;
