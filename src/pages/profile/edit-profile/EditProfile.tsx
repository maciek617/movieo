import { useEffect, useState } from 'react';
import { supabase } from '../../../App';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createBucket } from '../../../helpers/createBucket';
import { uploadFile } from '../../../helpers/uploadFile';
import Button from '../../../components/Button';
import ProfileImage from '../ProfileImage';
import ManThinkingImage from '../../../assets/man-thinking-to-start-a-startup.svg';
import Pill from '../../../components/Pill';
import Tooltip from '../../../components/Tooltip';
import Modal from '../../../components/Modal';

function EditProfile() {
  const { id } = useParams();
  const currentUser = useSelector((state: any) => state.currentUser.value);
  const [userData, setUserData] = useState<any>();
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>('');
  const [newBrief, setNewBrief] = useState<string>('');
  const [newHobby, setNewHobby] = useState<string>('');
  const [newHobbies, setNewHobbies] = useState<Array<string>>([]);
  const [facebook, setFacebook] = useState<string>('');
  const [instagram, setInstagram] = useState<string>('');
  const [twitter, setTwitter] = useState<string>('');
  const [tiktok, setTiktok] = useState<string>('');
  const [img, setImg] = useState<any>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userDataInDeleteReq, setUserDataInDeleteReq] = useState<any>(['0']);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id);

      if (!data || error) return;
      setUserData(data[0]);
      setImg(data[0].image);
      setNewHobbies(data[0].hobbies);
      setFacebook(data[0].facebook);
      setInstagram(data[0].instagram);
      setTwitter(data[0].twitter);
      setTiktok(data[0].tiktok);
    };

    fetchData();
  }, []);

  const updateSingleField = async (updateElementAndValue: object) => {
    const { error } = await supabase
      .from('users')
      .update(updateElementAndValue)
      .eq('id', id);

    setShowTooltip(true);

    return error;
  };

  const createNewBucket = async () => {
    if (!currentUser?.id) return;
    const { data } = await supabase.storage.getBucket(currentUser?.id);
    if (data) return;

    createBucket(currentUser?.id);
  };

  const getBucketItems = async (image: string) => {
    const { data } = await supabase.storage
      .from(currentUser?.id)
      .getPublicUrl(image);

    await updateSingleField({ image: data.publicUrl });
    await updateUserImg(data.publicUrl);

    return setImg(data.publicUrl);
  };

  const updateUserImg = async (img: string) => {
    const { data, error } = await supabase.auth.updateUser({
      data: { img: img },
    });

    return data && error;
  };

  const removePicture = async () => {
    const { data, error } = await supabase.storage
      .from(currentUser?.id)
      .remove([img.slice(img.lastIndexOf('/') + 1)]);

    await updateSingleField({ image: null });
    await updateUserImg('');
    setImg('');

    return data && error;
  };

  const uploadPicture = async (e: any) => {
    await createNewBucket();
    img && (await removePicture());

    await uploadFile(
      currentUser?.id,
      e.target.files[0]?.name,
      e.target.files[0]
    );

    await getBucketItems(e.target.files[0]?.name);
  };

  const deleteUser = async () => {
    if (userDataInDeleteReq?.includes(currentUser?.id)) return;

    const checkIfUserExistInReq = async () => {
      const { data, error } = await supabase
        .from('delete_account_req')
        .select('user_id');

      if (!data || error) return error;

      setUserDataInDeleteReq(data[0].user_id);
    };

    await checkIfUserExistInReq();

    const { error } = await supabase
      .from('delete_account_req')
      .update({ user_id: [...userDataInDeleteReq, currentUser?.id] })
      .eq('id', 1);

    if (!error) setShowModal(!showModal);
  };

  return (
    <div className='bg-main-dark min-h-screen'>
      <div className='container mx-auto text-white pt-32'>
        <div className='mb-10'>
          <h1 className='text-4xl tracking-wide font-bold'>
            My profile{' '}
            <Link to={'/profile/' + currentUser?.id}>
              <span className='text-main-yellow text-sm cursor-pointer'>
                Back to your profile
              </span>
            </Link>
          </h1>
          <p className='tracking-wider'>Manage your profile settings</p>
        </div>

        <div className='mb-10'>
          <h1 className='text-4xl tracking-wide font-bold'>
            Your profile picture
          </h1>
          <div className='flex gap-10 mt-5'>
            <div className='w-44 h-44'>
              <ProfileImage
                name={currentUser?.user_metadata?.name}
                image={img}
                rounded={true}
              />
            </div>
            <div className='flex flex-col gap-5 items-center justify-center relative'>
              <input
                type='file'
                accept='image/png, image/jpeg'
                className='hidden'
                id='file-upload'
                onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files) {
                    uploadPicture(e);
                  }
                }}
              />
              <label htmlFor='file-upload' className='custom-file-upload'>
                <div className='cursor-pointer px-6 py-2 rounded-lg font-semibold bg-main-yellow text-main-dark hover:bg-yellow-300'>
                  <p>Change picture</p>
                </div>
              </label>
              <Button text='Remove picture' fn={removePicture} />
            </div>
            <div className='max-w-lg w-full bg-gray-600 h-52 flex items-center p-4 rounded-md ml-20'>
              <img
                src={ManThinkingImage}
                alt='Man thinking'
                className='w-full h-full object-fit'
              />
              <p>
                Stand out from other profiles. Add a photo that will be your
                unique business card.
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className='tracking-wider pb-2'>Username</p>
          <input
            type='text'
            placeholder={userData?.name}
            className='border border-main-yellow bg-transparent py-1 px-2 rounded'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewName(e.target.value)
            }
            value={newName}
          />
          <Button
            text='Save'
            addClasses='ml-2'
            fn={() => newName.length && updateSingleField({ name: newName })}
          />
        </div>
        <div className='my-5'>
          <p className='tracking-wider pb-2'>Brief</p>
          <div className='flex items-start'>
            <textarea
              placeholder={userData?.brief}
              className='border border-main-yellow bg-transparent py-1 px-2 rounded'
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setNewBrief(e.target.value)
              }
              value={newBrief}
            ></textarea>
            <Button
              text='Save'
              addClasses='ml-2'
              fn={() =>
                newBrief.length && updateSingleField({ brief: newBrief })
              }
            />
          </div>
        </div>
        <div>
          <p>Hobbies</p>
          <input
            type='text'
            placeholder='Hobby'
            className='border border-main-yellow bg-transparent py-1 px-2 rounded'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewHobby(e.target.value)
            }
            value={newHobby}
          />
          <Button
            text='Add'
            addClasses='ml-2'
            fn={() => {
              newHobby.length && setNewHobbies([...newHobbies, newHobby]);
              setNewHobby('');
            }}
          />
          <div className='flex gap-10 my-5'>
            {newHobbies?.map((hobby, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setNewHobbies(
                      newHobbies.filter((_, indexEl) => index !== indexEl)
                    );
                  }}
                >
                  <Pill text={hobby} icon={true} />
                </div>
              );
            })}
          </div>
          <Button
            text='Save'
            fn={() => updateSingleField({ hobbies: newHobbies })}
            addClasses='mb-5'
          />
        </div>
        <div>
          <p className='tracking-wider pb-2'>Social Media</p>
          <div className='flex items-center'>
            <div className='w-10 h-10 mb-2'>
              <i className='fa-brands fa-facebook text-3xl'></i>
            </div>
            <input
              type='url'
              placeholder={facebook}
              className='border border-main-yellow bg-transparent py-1 px-2 rounded'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFacebook(e.target.value)
              }
              value={facebook}
            />
            <Button
              text='Save'
              addClasses='ml-2'
              fn={() =>
                facebook.length && updateSingleField({ facebook: facebook })
              }
            />
          </div>
          <div className='flex items-center'>
            <div className='w-10 h-10 my-2'>
              <i className='fa-brands fa-instagram text-3xl'></i>
            </div>
            <input
              type='url'
              placeholder={instagram}
              className='border border-main-yellow bg-transparent py-1 px-2 rounded'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInstagram(e.target.value)
              }
              value={instagram}
            />
            <Button
              text='Save'
              addClasses='ml-2'
              fn={() =>
                instagram.length &&
                updateSingleField({
                  instagram: instagram,
                })
              }
            />
          </div>
          <div className='flex items-center'>
            <div className='w-10 h-10 my-2'>
              <i className='fa-brands fa-twitter text-3xl'></i>
            </div>
            <input
              type='url'
              placeholder={twitter}
              className='border border-main-yellow bg-transparent py-1 px-2 rounded'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTwitter(e.target.value)
              }
              value={twitter}
            />
            <Button
              text='Save'
              addClasses='ml-2'
              fn={() =>
                twitter.length &&
                updateSingleField({
                  twitter: twitter,
                })
              }
            />
          </div>
          <div className='flex items-center'>
            <div className='w-10 h-10 my-2'>
              <i className='fa-brands fa-tiktok text-3xl'></i>
            </div>
            <input
              type='url'
              placeholder={tiktok}
              className='border border-main-yellow bg-transparent py-1 px-2 rounded'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTiktok(e.target.value)
              }
              value={tiktok}
            />
            <Button
              text='Save'
              addClasses='ml-2'
              fn={() =>
                tiktok.length &&
                updateSingleField({
                  tiktok: tiktok,
                })
              }
            />
          </div>
        </div>
        <div className='py-5'>
          <p className='tracking-wider pb-2'>Reset your statistics</p>
          <Button
            text='Reset comments count'
            fn={() => updateSingleField({ comments_length: 0 })}
          />
          <Button
            text='Reset post count'
            addClasses='ml-2'
            fn={() => updateSingleField({ post_length: 0 })}
          />
          <p className='text-sm mt-2'>*This action cannot be undone!</p>
        </div>
        <div>
          <p className='text-red-400'>*Delete my account</p>
          <Button text='Delete my account' fn={deleteUser} />
          <Link to={'/profile/' + currentUser?.id}>
            <p className='text-main-yellow text-sm cursor-pointer mt-5'>
              Back to your profile
            </p>
          </Link>
        </div>
      </div>
      {showTooltip && (
        <Tooltip
          variant='green'
          text='Changes saved!'
          isShow={showTooltip}
          closeTooltip={setShowTooltip}
        />
      )}
      {showModal && (
        <Modal
          text='Your submission has been sent. Your account would be deleted in 24 hours.'
          fn={setShowModal}
        />
      )}
    </div>
  );
}

export default EditProfile;
