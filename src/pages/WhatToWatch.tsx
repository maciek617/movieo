import Button from '../components/Button';
import { supabase } from '../App';
import { useState } from 'react';
import SingleFilmBox from './browse-film/SingleFilmBox';
import FAQ from '../components/FAQ';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function WhatToWatch() {
  const [randomMovie, setRandomMovie] = useState<any>({});
  const currentUser = useSelector((state: any) => state.currentUser.value);
  const fetchData = async () => {
    const { data, error } = await supabase.from('movies').select();
    if (error) return;

    // Get random movie and save it to randomMovie variable
    setRandomMovie(data[Math.floor(Math.random() * data.length)]);
  };

  const faqBase = [
    {
      title: 'Why Can I only generate one movie per 24 hours?',
      description:
        'We considered that making this limit can reduce our users time in front of a screen.',
    },
    {
      title: 'Is this free?',
      description: 'Yeah, everything is free so do not worry about it',
    },
    {
      title: 'Can I generate more than once in 24 hours?',
      description:
        'No, you cannot generate more films even if you are a premium member',
    },
  ];

  return currentUser?.id ? (
    <div className='min-h-screen h-full bg-main-dark pt-32'>
      <div className='bg-main-dark text-white'>
        {/* Update counter on page refresh */}
        <p className='text-center py-10'>
          Your next generation will be in: {17} hrs {23} min {11} sec.
        </p>
        {!randomMovie?.id ? (
          <div className='flex items-center justify-center flex-col'>
            <h1 className='text-2xl max-w-4xl text-center'>
              You cannot decide what to review or watch? We're same but, we
              provided movie picker just click button below and start exploring!
            </h1>
            {/* Why to use what to watch functionality? */}
            {/* 3 random generate per 24h (store date to next update in local storage and later in database to reduce traffic in database), display time when is not the right time to next generation, prevent from abusing, disable button, change classes */}
            <Button
              text={'Pick random movie'}
              addClasses='mt-10'
              fn={fetchData}
            />
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center'>
            <h1 className='py-4 text-4xl'>
              Your randomly picked movie is right below:
            </h1>
            <SingleFilmBox
              filmTitle={randomMovie.name}
              image={randomMovie.image}
              filmType={randomMovie.type}
              streamingPlatform={randomMovie.platform}
              rating={randomMovie.rating}
            />
            <div className='flex items-center gap-5'>
              <Button text='Go to review' addClasses='mt-5' icon={true} />
              <Button text='Refresh' addClasses='mt-5' />
            </div>
          </div>
        )}
      </div>
      <div className='bg-main-dark text-white py-20'>
        <FAQ faqs={faqBase} />
      </div>
    </div>
  ) : (
    <div className='h-screen bg-main-dark text-white flex items-center justify-center flex-col'>
      <h1 className='text-2xl text-center'>
        You have to be logged in to use this feature.
      </h1>
      <Link
        to={document.cookie.includes('wasLoggedIn') ? '/login' : '/signup'}
        replace
      >
        <Button text='Get started' addClasses='mt-5' />
      </Link>
    </div>
  );
}

export default WhatToWatch;
