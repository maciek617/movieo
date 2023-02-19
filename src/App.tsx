import PagesLinks from './pages/PagesLinks';
import Navigation from './components/Navigation';
import { createClient } from '@supabase/supabase-js';
import { useSelector } from 'react-redux';
import Footer from './components/Footer';

export const supabase = createClient(
  'https://uzlcyjmxvoczytwcmscx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6bGN5am14dm9jenl0d2Ntc2N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ2NzQwNDEsImV4cCI6MTk5MDI1MDA0MX0.LPL-FgqCLD_g1jvvDFIjszo81fXhbtKuaesQuxbC8Ko'
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
