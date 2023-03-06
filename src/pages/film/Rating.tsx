import { supabase } from '../../App';
import { useState, useEffect } from 'react';
import Tooltip from '../../components/Tooltip';
interface RatingProps {
  routeId: string | undefined;
  userId: string;
  user_can_vote: boolean;
}
function Rating({ ...props }: RatingProps) {
  const [rate, setRate] = useState(0);
  const [allRates, setAllRates] = useState<any>();
  const [voted, setVoted] = useState(false);
  const [usersRating, setUsersRating] = useState<any>(0);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const starsArr = [5, 4, 3, 2, 1];

  useEffect(() => {
    const getAllRates = async () => {
      const { data, error } = await supabase
        .from('movies')
        .select('rates')
        .eq('id', props.routeId);

      if (error && !data) return;
      setAllRates(data[0].rates);
    };

    const getRating = async () => {
      const { data, error } = await supabase
        .from('movies')
        .select('rating')
        .eq('id', props.routeId);

      if (error && !data) return;
      setUsersRating(data[0].rating);
    };
    getAllRates();
    getRating();
  }, []);

  useEffect(() => {
    const singleUserRate = allRates?.filter(
      (e: any) => e.id === props.userId
    )[0]?.rate;

    return setRate(singleUserRate ? singleUserRate : 0);
  }, [allRates]);

  const updateSingleRating = async (userRate: number) => {
    const { error } = await supabase
      .from('movies')
      .update({
        rating: allRates?.length
          ? (usersRating + userRate) / (allRates?.length + 1)
          : usersRating + userRate,
      })
      .eq('id', props.routeId);
  };

  const updateRating = async (userRate: number) => {
    if (!voted && !allRates.some((e: any) => e.id === props.userId)) {
      const { error } = await supabase
        .from('movies')
        .update({ rates: [...allRates, { id: props.userId, rate: userRate }] })
        .eq('id', props.routeId);

      if (error) return;
      await updateSingleRating(userRate);
    }
  };

  const star = starsArr.map((star, index) => {
    return (
      <i
        key={index}
        onClick={() => {
          setRate(star);
          setVoted(true);
          updateRating(star);
          setShowTooltip(true);
        }}
        className={`fa-solid fa-star ${
          rate + 1 > star ? 'text-main-yellow' : ''
        }`}
      ></i>
    );
  });

  return (
    <div className='flex'>
      {props.user_can_vote ? (
        <>
          {showTooltip && (
            <Tooltip
              text='Rate completed!'
              variant='green'
              isShow={showTooltip}
              closeTooltip={setShowTooltip}
            />
          )}
          <div className='rating mt-10 text-xl gap-2 flex cursor-pointer text-white hover'>
            {star}
          </div>
        </>
      ) : (
        <p className='text-red-400 mt-5'>User did not allow to vote</p>
      )}
    </div>
  );
}

export default Rating;
