interface ProfileSocialMediaProps {
  facebook: string;
  instagram: string;
  twitter: string;
  tiktok: string;
}

function ProfileSocialMedia({ ...props }: ProfileSocialMediaProps) {
  return (
    <div className='mt-5 text-xl'>
      <p className='uppercase font-semibold text-sm tracking-wider text-gray-400'>
        <i className='fa-solid fa-share-nodes'></i> social media
      </p>
      <div className='flex gap-3 mt-1'>
        <a href={props.facebook} target='_blank'>
          <i className='fa-brands fa-facebook cursor-pointer hover:text-main-yellow transition-colors'></i>
        </a>
        <a href={props.instagram} target='_blank'>
          <i className='fa-brands fa-instagram cursor-pointer hover:text-main-yellow transition-colors'></i>
        </a>
        <a href={props.twitter} target='_blank'>
          <i className='fa-brands fa-twitter cursor-pointer hover:text-main-yellow transition-colors'></i>
        </a>
        <a href={props.tiktok} target='_blank'>
          <i className='fa-brands fa-tiktok cursor-pointer hover:text-main-yellow transition-colors'></i>
        </a>
      </div>
    </div>
  );
}

export default ProfileSocialMedia;
