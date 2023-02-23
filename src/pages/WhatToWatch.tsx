import Button from '../components/Button';
import { supabase } from '../App';
import { useState, useEffect } from 'react';
import SingleFilmBox from './browse-film/SingleFilmBox';
import FAQ from '../components/FAQ';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function WhatToWatch() {
  const currentUser = useSelector((state: any) => state.currentUser.value);
  const [generationDate, setGenerationDate] = useState<any>(null);
  const [randomMovie, setRandomMovie] = useState<any>({});
  const [tomorrow, setTomorrow] = useState<any>(new Date());
  const [today, setToday] = useState(new Date());
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);

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

  const pickRandomMovie = async () => {
    if (generationDate !== null && Date.parse(generationDate) - +today > 0)
      return;
    await fetchData();
    setTomorrow(tomorrow.setDate(tomorrow.getDate() + 1));
    updateGenerationDate(tomorrow);
  };

  const updateGenerationDate = async (tomorrow: any) => {
    const { error } = await supabase
      .from('users')
      .update({ date_to_next_generation: tomorrow })
      .eq('id', currentUser.id);
  };

  useEffect(() => {
    const fetchNextGenerationDate = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('date_to_next_generation')
        .eq('id', currentUser?.id);

      if (error) return;
      setGenerationDate(data[0].date_to_next_generation);
    };

    currentUser?.id && fetchNextGenerationDate();
  }, [currentUser?.id]);

  useEffect(() => {
    const updateTime = () => {
      if (!generationDate) return;
      setHours(
        Math.floor(
          ((Date.parse(generationDate) - new Date().getTime()) /
            1000 /
            60 /
            60) %
            60
        )
      );
      setMinutes(
        Math.floor(
          ((Date.parse(generationDate) - new Date().getTime()) / 1000 / 60) % 60
        )
      );
    };
    updateTime();
  }, [generationDate]);

  return currentUser?.id ? (
    <div className='min-h-screen h-full bg-main-dark pt-32'>
      <div className='bg-main-dark text-white'>
        {generationDate !== null && Date.parse(generationDate) - +today > 0 ? (
          <p className='text-center py-10'>
            Your next generation will be in: {hours && hours} hours{' '}
            {minutes && minutes} minutes.
          </p>
        ) : (
          <div className='flex items-center justify-center flex-col'>
            <h1 className='text-2xl max-w-4xl text-center'>
              You cannot decide what to review or watch? We're same but, we
              provided movie picker just click button below and start exploring!
            </h1>
            <Button
              text={'Pick random movie'}
              addClasses='mt-10'
              fn={pickRandomMovie}
            />
          </div>
        )}

        {randomMovie?.id && (
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
              <Button text='Go home' addClasses='mt-5' />
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
