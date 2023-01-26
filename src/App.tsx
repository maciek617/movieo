import { useEffect } from 'react';
import PagesLinks from './pages/PagesLinks';
import Navigation from './components/Navigation';
import { createClient } from '@supabase/supabase-js';
import { useDispatch } from 'react-redux';
import { updateUser } from './features/currentUser';
export const supabase = createClient(
  'https://uzlcyjmxvoczytwcmscx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6bGN5am14dm9jenl0d2Ntc2N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ2NzQwNDEsImV4cCI6MTk5MDI1MDA0MX0.LPL-FgqCLD_g1jvvDFIjszo81fXhbtKuaesQuxbC8Ko'
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      dispatch(updateUser(user));
    };
    getUser();
  }, []);

  return (
    <div className='App'>
      <PagesLinks />
      <Navigation />
    </div>
  );
}

export default App;
