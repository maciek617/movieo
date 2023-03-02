function ProfileSocialMedia() {
  return (
    <div className='mt-5 text-xl'>
      <p className='uppercase font-semibold text-sm tracking-wider text-gray-400'>
        <i className='fa-solid fa-share-nodes'></i> social media
      </p>
      <div className='flex gap-3 mt-1'>
        <i className='fa-brands fa-facebook cursor-pointer'></i>
        <i className='fa-brands fa-instagram cursor-pointer'></i>
        <i className='fa-brands fa-twitter cursor-pointer'></i>
        <i className='fa-brands fa-tiktok cursor-pointer'></i>
      </div>
    </div>
  );
}

export default ProfileSocialMedia;
