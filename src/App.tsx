import PagesLinks from './pages/PagesLinks';
import Navigation from './components/Navigation';
import { createClient } from '@supabase/supabase-js';
import { useSelector } from 'react-redux';
import Footer from './components/Footer';

export const supabase = createClient(
  'https://uzlcyjmxvoczytwcmscx.supabase.co',
  import.meta.env.VITE_SUPABASE_API_KEY
);

// TODO: Make .env file to save api key above

function App() {
  const currentUser = useSelector((state: any) => state.currentUser.value);

  return (
    <div className='App'>
      <PagesLinks />
      <Navigation user={currentUser} />
      <Footer />
    </div>
  );
}

export default App;
