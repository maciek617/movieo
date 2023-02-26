import Button from '../../components/Button';
import Comment from './Comment';
import { useState, useEffect } from 'react';
import { countSingleWords } from '../../helpers/countWords';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { supabase } from '../../App';
import moment from 'moment';

function FilmComments() {
  const { id } = useParams();
  const [commentText, setCommentText] = useState<string>('');
  const [filmComments, setFilmComments] = useState<any>([]);
  const currentUser = useSelector((state: any) => state.currentUser.value);

  useEffect(() => {
    const fetchCommentsData = async () => {
      const { data, error } = await supabase
        .from('movies')
        .select('comments')
        .eq('id', id);

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
            name: currentUser?.user_metadata?.name,
            when: new Date(),
            what: commentText,
            userId: currentUser?.id,
            userImage: currentUser?.image ? currentUser?.image : null,
          },
          ...filmComments,
        ],
      })
      .eq('id', id)
      .select();

    if (data) {
      setFilmComments(data[0].comments);
      setCommentText('');
    }
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

    if (data) setFilmComments(data[0].comments);
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
      />
    );
  });

  return (
    <div className='mt-10'>
      <p className='text-3xl text-white'>Comments:</p>
      <div className='mt-5 my-10 flex border-b border-gray-600 pb-5 w-4/5 flex-col'>
        <div className='flex'>
          {currentUser?.image ? (
            <img src={currentUser.image} />
          ) : (
            <div className='mr-5 w-10 h-10 rounded-full border border-main-yellow flex items-center justify-center text-white'>
              {currentUser?.user_metadata?.name.charAt(0)}
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
