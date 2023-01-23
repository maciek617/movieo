import { useState } from 'react';
import PagesLinks from './pages/PagesLinks';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className='App'>
      <PagesLinks />
      <Navigation />
    </div>
  );
}

export default App;
