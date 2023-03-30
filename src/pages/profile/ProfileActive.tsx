function ProfileActive({ isActive }: { isActive: boolean }) {
  return (
    <div className="absolute top-0 left-0">
      <span
        className={`block w-5 h-5 rounded-full bg-${
          isActive ? 'green-400' : 'red-400'
        }`}
      ></span>
    </div>
  );
}

export default ProfileActive;
