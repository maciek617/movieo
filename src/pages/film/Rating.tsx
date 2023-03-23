import { supabase } from '../../App';
import { useState, useEffect } from 'react';
import Tooltip from '../../components/Tooltip';
interface RatingProps {
  routeId: string | undefined;
  userId: string;
  user_can_vote: boolean;
}

interface Rate {
  id: string;
  rate: number;
}
function Rating({ ...props }: RatingProps) {
  const [rate, setRate] = useState<number>(0);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [showWrongTooltip, setShowWrongTooltip] = useState<boolean>(false);
  const [allRates, setAllRates] = useState<Rate[]>([]);
  const [currentUserRate, setCurrentUserRate] = useState<Rate[]>([]);
  const [sumOfAlLRates, setSumOfAllRates] = useState<number>(0);
  const starsArr = [5, 4, 3, 2, 1];

  useEffect(() => {
    const getCurrentUserVotedData = async () => {
      const { data, error } = await supabase
        .from('movies')
        .select('rates')
        .eq('id', props.routeId);

      setAllRates(data?.[0].rates);
      setCurrentUserRate(
        data?.[0].rates.filter((el: any) => el.id === props.userId)
      );
    };

    getCurrentUserVotedData();
  }, [props.routeId]);

  useEffect(() => {
    setRate(currentUserRate?.[0]?.rate);
    setSumOfAllRates(allRates.reduce((a, b) => a + b.rate, 0));
  }, [allRates]);

  const updateRating = async (starCount: number) => {
    if (rate) {
      setShowWrongTooltip(true);
      return;
    }

    const updateRates = async () => {
      await supabase
        .from('movies')
        .update({
          rates: [{ id: props.userId, rate: starCount }, ...allRates],
        })
        .eq('id', props.routeId);
    };

    const updateRating = async () => {
      await supabase
        .from('movies')
        .update({
          rating: (sumOfAlLRates + starCount) / (allRates?.length + 1),
        })
        .eq('id', props.routeId);
    };

    await updateRates();
    await updateRating();
    setRate(starCount);
    setShowTooltip(true);
  };

  const star = starsArr.map((star, index) => {
    return (
      <i
        key={index}
        onClick={async () => await updateRating(star)}
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
          {showWrongTooltip && (
            <Tooltip
              text='Cant vote twice!'
              variant='red'
              isShow={showWrongTooltip}
              closeTooltip={setShowWrongTooltip}
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
