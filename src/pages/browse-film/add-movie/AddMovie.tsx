import { useState, useEffect } from 'react';
import { supabase } from '../../../App';
import { useSelector } from 'react-redux';
import { countSingleWords } from '../../../helpers/countWords';
import { uploadFile } from '../../../helpers/uploadFile';
import AddMovieInput from './AddMovieInput';
import AddMovieTextarea from './AddMovieTextarea';
import Button from '../../../components/Button';
import Pill from '../../../components/Pill';
import Modal from '../../../components/Modal';
import AddMovieCheckbox from './AddMovieCheckbox';
import SelectOptions from './SelectOptions';
import AddMovieImageScreen from './AddMovieImageScreen';
import Spinner from '../../../components/Spinner';
import { Link, useNavigate } from 'react-router-dom';

function AddMovie() {
  const currentUser = useSelector((state: any) => state.currentUser.value);
  const [title, setTitle] = useState<string>('');
  const [brief, setBrief] = useState<string>('');
  const [review, setReview] = useState<string>('');
  const [character, setCharacter] = useState<string>('');
  const [characters, setCharacters] = useState<Array<string>>([]);
  const [platform, setPlatform] = useState<string>('Netflix');
  const [error, setError] = useState<string>('');
  const [rate, setRate] = useState<number>(5);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [userVote, setUserVote] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [showCreatedDate, setShowCreatedDate] = useState<boolean>(false);
  const [type, setType] = useState<string>('Action');
  const [year, setYear] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [img, setImg] = useState<string>('');
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  const navigate = useNavigate();
  // Function that adds character string to characters array of strings
  const addCharacter = () => {
    if (!character || characters.length >= 10) return;
    if (characters.includes(character)) return;
    if (/\d/.test(character)) return;

    setCharacters([...characters, character]);
    setCharacter('');
  };

  //Remove pills
  const removePills = (elIndex: number) => {
    const newChar = characters.filter((el, index) => index !== elIndex);
    setCharacters(newChar);
  };

  //   Characters pills
  const charPills = characters.map((char, index) => {
    return (
      <div key={index} onClick={() => removePills(index)}>
        <Pill text={char} icon={true} />
      </div>
    );
  });

  // TODO: After creation user, we should create a bucket to store here a images,

  //   Add movie data without validation
  const addMovieData = async () => {
    setShowSpinner(true);

    const { error } = await supabase.from('movies').insert({
      id: Math.floor(Math.random() * 10000), //random id handle the same generated id
      name: title,
      brief: brief,
      description: review,
      user_id: currentUser?.id,
      email: currentUser?.email,
      actors: characters,
      platform: platform,
      rating: rate,
      rates: [{ id: currentUser?.id, rate: rate }],
      comments: [],
      show_comments: showComments,
      show_profile: showProfile,
      user_can_vote: userVote,
      show_created_date: showCreatedDate,
      image: img,
      type: type,
      year: year,
      time: +time,
    });

    if (!error) {
      const { data } = await supabase
        .from('users')
        .select('post_length')
        .eq('id', currentUser?.id);

      if (data) {
        const { error } = await supabase
          .from('users')
          .update({ post_length: data[0]?.post_length + 1 })
          .eq('id', currentUser?.id);

        if (!error) {
          setShowSpinner(false);
          navigate('/browse/most-popular/netflix/action');
        }
      }
    }
  };

  // Set movie with validation
  const setNewMovie = async () => {
    if (!title || !brief || !review || !characters || !platform) {
      setError('All fields must be filled.');
      return;
    }

    if (title.length < 3) {
      setError('Title should be at least 3 characters long.');
      return;
    }

    if (+year < 0) {
      setError('Year of release cannot be less than 0.');
      return;
    }

    if (+time < 0) {
      setError('Duration of production cannot be less than 0.');
      return;
    }

    if (countSingleWords(brief) < 20) {
      setError('Brief should be at least 20 characters long.');
      return;
    }

    if (countSingleWords(brief) > 100) {
      setError('Brief cannot be longer than 100 characters.');
      return;
    }

    if (countSingleWords(review) < 50) {
      setError('Review should be at least 50 characters long.');
      return;
    }

    if (countSingleWords(review) > 500) {
      setError('Brief cannot be longer than 500 characters.');
      return;
    }

    if (characters.length < 3) {
      setError('There should be at least 3 actors.');
      return;
    }

    if (characters.length > 10) {
      setError('There should not be more than 10 actors.');
      return;
    }

    setError('');

    if (!error) await addMovieData();
  };


  // Get bucket element
  const getBucketItems = async (image: string) => {
    const { data } = supabase.storage.from(currentUser.id).getPublicUrl(image);
    return setImg(data.publicUrl);
  };

  return (
    <div className='bg-main-dark px-4'>
      <div className='container mx-auto py-20 text-white pt-28'>
        <AddMovieInput
          labelTitle='Production title'
          inputPlaceholder='ex. The 100'
          functionHandler={setTitle}
          inputType='text'
          textHandler={title}
        />

        <div className='flex flex-col mt-10'>
          <label>Select where user can watch this production.</label>
          <select
            className='bg-transparent outline-0 border border-white p-1 rounded-sm w-40'
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setPlatform(e.target.value);
            }}
          >
            <SelectOptions type={false} />
          </select>
        </div>

        <div className='flex flex-col mt-10'>
          <label>Select type of this production.</label>
          <select
            className='bg-transparent outline-0 border border-white p-1 rounded-sm w-40'
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setType(e.target.value);
            }}
          >
            <SelectOptions type={true} />
          </select>
        </div>

        <div className='flex flex-col mt-10'>
          <AddMovieInput
            inputType='number'
            labelTitle='Write a release year of this production'
            inputPlaceholder='ex. 2023'
            functionHandler={setYear}
            textHandler={year}
          />
        </div>
        <div className='flex flex-col mt-10'>
          <AddMovieInput
            inputType='number'
            labelTitle='Write a duration of this production (in minutes)'
            inputPlaceholder='ex. 140'
            functionHandler={setTime}
            textHandler={time}
          />
        </div>

        {/* Input or textarea */}

        <div className='relative border border-white rounded-lg h-72 my-10 border-dotted cursor-pointer flex flex-col items-center justify-center transition-all  hover:bg-gray-900'>
          <input
            type='file'
            accept='image/png, image/jpeg'
            className='w-full h-full opacity-0 absolute cursor-pointer'
            onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files) {
                if (img) {
                  const { data, error } = await supabase.storage
                    .from(currentUser?.id)
                    .remove([img.slice(img.lastIndexOf('/') + 1)]);

                  console.log(error);
                }

                await uploadFile(
                  currentUser.id,
                  e.target.files[0]?.name,
                  e.target.files[0]
                );

                getBucketItems(e.target?.files[0].name);
              }
            }}
          />
          <AddMovieImageScreen img={img} />
        </div>

        

        <AddMovieTextarea
          labelTitle='Enter a brief (min. 20 words, max. 100 words)'
          textareaPlaceholder='ex. This is the best movie I have ever seen in my whole life.'
          functionHandler={setBrief}
          textHandlerValue={brief}
          maxChar={100}
          big={false}
        />

        <AddMovieTextarea
          labelTitle='Enter your review (min. 50 words, max. 500 words)'
          textareaPlaceholder='ex. In my opinion this is the best way to describe this movie. To begin with...'
          functionHandler={setReview}
          textHandlerValue={review}
          maxChar={500}
          big={true}
        />

        <div className='flex items-center'>
          <AddMovieInput
            inputType='text'
            labelTitle='Add at least 3 characters up to 10'
            inputPlaceholder='ex. Jimmy Carter'
            functionHandler={setCharacter}
            textHandler={character}
          />
          <Button text='+' addClasses='mt-4 ml-10' fn={addCharacter} />
        </div>

        <div className='mt-5'>
          <div className='flex gap-10 flex-wrap'>{charPills}</div>
        </div>

        <div className='my-5'>
          <p>Your overall rating</p>
          <div className='flex items-center gap-5'>
            <input
              type='range'
              min={0}
              max={5}
              step={1}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setRate(+e.target.value);
              }}
              value={rate}
            />
            <p>{rate} / 5</p>
          </div>
        </div>

        <AddMovieCheckbox
          labelText='Other users can comment'
          id='comment'
          fn={setShowComments}
        />
        <AddMovieCheckbox
          labelText='Other users can vote'
          id='vote'
          fn={setUserVote}
        />
        <AddMovieCheckbox
          labelText='Show created date'
          id='date'
          fn={setShowCreatedDate}
        />
        <AddMovieCheckbox
          labelText='Show link to your profile'
          id='profile'
          fn={setShowProfile}
        />

        <div className='mt-10 flex flex-wrap'>
          <Button text='Add Movie' fn={setNewMovie} icon={true} />
          <Link to={'/browse/most-popular/netflix/action'}>
            <Button text='Cancel' addClasses='ml-10' />
          </Link>
          <Button text='I need help' addClasses='ml-10' />
        </div>
      </div>
      {error && <Modal text={error} fn={setError} error={true} />}
      {showSpinner && (
        <div className='z-50 fixed top-0 left-0 w-full h-screen flex items-center justify-center darken-bg'>
          <Spinner isDark={true} />
        </div>
      )}
    </div>
  );
}

export default AddMovie;
