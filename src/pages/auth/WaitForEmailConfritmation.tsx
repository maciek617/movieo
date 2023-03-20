function WaitForEmailConfritmation() {
  return (
    <div className='bg-main-dark h-screen text-white'>
      <div className='container mx-auto px-4 flex items-center justify-center h-screen'>
        <div className='bg-gray-600 max-w-xl mx-auto py-10'>
          <h1 className='text-center'>
            Check your mailbox and confirm email you provided in account
            creation panel. You won't be able to login if you don't confirm your
            email!
          </h1>
          <div className='mt-10 text-center'>
            <p className='text-2xl'>
              Movie<span className='text-main-yellow'>o</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WaitForEmailConfritmation;
