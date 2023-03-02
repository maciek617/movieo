import PagesLinks from './pages/PagesLinks';
import Navigation from './components/Navigation';
import { createClient } from '@supabase/supabase-js';
import { useSelector } from 'react-redux';
import Footer from './components/Footer';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const supabase = createClient(
  'https://uzlcyjmxvoczytwcmscx.supabase.co',
  import.meta.env.VITE_SUPABASE_API_KEY
);

function App() {
  const currentUser = useSelector((state: any) => state.currentUser.value);
  const location = useLocation();

  useEffect(() => {
    return () => {
      window.scrollTo(0, 0);
    };
  }, [location]);

  return (
    <div className='App'>
      <PagesLinks />
      <Navigation user={currentUser} />
      <Footer />
    </div>
  );
}

export default App;
