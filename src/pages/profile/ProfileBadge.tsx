function ProfileBadge({ badge }: { badge: string }) {
  return (
    <div className='absolute top-5 right-3 bg-main-yellow text-black px-4 py-2 rounded-lg shadow-lg'>
      {badge}
    </div>
  );
}

export default ProfileBadge;
