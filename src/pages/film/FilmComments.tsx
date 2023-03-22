import Button from '../../components/Button';
import Comment from './Comment';
import { useState, useEffect } from 'react';
import { countSingleWords } from '../../helpers/countWords';
import { useParams } from 'react-router-dom';
import { supabase } from '../../App';
import moment from 'moment';
import Tooltip from '../../components/Tooltip';
interface FilmCommentsProps {
  userId: string;
  userImage: string;
  userName: string;
  creatorId: string;
}

function FilmComments({ ...props }: FilmCommentsProps) {
  const { id } = useParams();
  const [commentText, setCommentText] = useState<string>('');
  const [filmComments, setFilmComments] = useState<any>([]);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  useEffect(() => {
    const fetchCommentsData = async () => {
      const { data, error } = await supabase
        .from('movies')
        .select('comments')
        .eq('id', id);

      if (error) return;
      if (data) setFilmComments(data[0].comments);
    };

    fetchCommentsData();
  }, [id]);

  const addComment = async () => {
    if (!commentText) return;
    const { data, error } = await supabase
      .from('movies')
      .update({
        comments: [
          {
            name: props.userName,
            when: new Date(),
            what: commentText,
            userId: props.userId,
            userImage: props.userImage,
          },
          ...filmComments,
        ],
      })
      .eq('id', id)
      .select();

    if (data && !error) {
      setFilmComments(data[0].comments);
      await getAndUpdateUserCommentsLength();
      await updateLastUserComment();
      setCommentText('');
      setShowTooltip(true);
    }
  };

  const getAndUpdateUserCommentsLength = async () => {
    const { data } = await supabase
      .from('users')
      .select('comments_length')
      .eq('id', props.userId);

    if (!data) return;

    const { error } = await supabase
      .from('users')
      .update({ comments_length: data[0]?.comments_length + 1 })
      .eq('id', props.userId);

    if (error) return;
  };

  const updateLastUserComment = async () => {
    const { error } = await supabase
      .from('users')
      .update({ last_comment: commentText })
      .eq('id', props.userId);

    if (error) return;
  };

  const deleteComment = async (index: number) => {
    const { data, error } = await supabase
      .from('movies')
      .update({
        comments: filmComments.filter(
          (comment: any, indexComment: number) => indexComment !== index
        ),
      })
      .eq('id', id)
      .select();

    if (data && !error) setFilmComments(data[0].comments);
  };

  const allComments = filmComments.map((comment: any, index: number) => {
    return (
      <Comment
        key={comment.when}
        name={comment.name}
        userId={comment.userId}
        when={moment(comment.when).fromNow()}
        userImage={comment.userImage}
        what={comment.what}
        deleteComment={() => deleteComment(index)}
        currentUserId={props.userId}
        creatorId={props.creatorId}
      />
    );
  });

  return (
    <div className='mt-10'>
      {showTooltip && (
        <Tooltip
          text='Comment added!'
          variant='green'
          isShow={showTooltip}
          closeTooltip={setShowTooltip}
        />
      )}
      <p className='text-3xl text-white'>Comments:</p>
      <div className='mt-5 my-10 flex border-b border-gray-600 pb-5 w-4/5 flex-col'>
        <div className='flex'>
          {props.userImage ? (
            <img
              src={props.userImage}
              className='mr-5 w-10 h-10 rounded-full object-cover'
            />
          ) : (
            <div className='mr-5 w-10 h-10 rounded-full border border-main-yellow flex items-center justify-center text-white'>
              {props.userName.charAt(0)}
            </div>
          )}
          <input
            type='text'
            placeholder='Write some comment'
            className='w-4/5 px-2 py-4 bg-main-dark outline-none text-white border-main-yellow border'
            onChange={(e) => setCommentText(e.target.value)}
            value={commentText}
          />
        </div>
        <div className='flex justify-between items-center'>
          <Button
            text='Comment'
            addClasses='ml-14 mt-2'
            icon={true}
            fn={addComment}
          />
          <p className='text-white mr-36'>
            {countSingleWords(commentText)}/100
          </p>
        </div>
      </div>
      <div>
        {filmComments?.length ? (
          allComments
        ) : (
          <p className='text-white ml-16'>Be first to comment this post.</p>
        )}
      </div>
    </div>
  );
}

export default FilmComments;
