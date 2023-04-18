function ProfileActive({ isActive }: { isActive: boolean }) {
  return (
    <div
      className={`absolute bottom-0 left-0 flex items-center gap-2 border px-2 rounded-lg bg-custom-green ${
        isActive
          ? 'border-green-400 bg-custom-green'
          : 'border-red-400 bg-custom-red'
      }`}
    >
      <span
        className={`block w-5 h-5 rounded-full bg-${
          isActive ? 'green-400' : 'red-400'
        }`}
      ></span>
      <p>{isActive ? 'Online' : 'Offline'}</p>
    </div>
  );
}

export default ProfileActive;
