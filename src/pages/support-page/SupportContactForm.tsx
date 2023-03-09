import Button from '../../components/Button';
function SupportContactForm() {
  return (
    <div>
      <form className='text-white mt-10'>
        <div className='flex flex-col items-center justify-center max-w-sm w-full mx-auto gap-5'>
          <div className='flex flex-col w-full'>
            <label>Name</label>
            <input
              type='text'
              placeholder='John...'
              className='text-black px-4 py-2 w-full'
            />
          </div>

          <div className='flex flex-col w-full'>
            <label>Email</label>
            <input
              type='email'
              placeholder='John...'
              className='text-black px-4 py-2 w-full'
            />
          </div>

          <div className='flex flex-col w-full'>
            <label>Message</label>
            <textarea
              placeholder='John...'
              className='text-black px-4 py-2 w-full'
            />
          </div>
          <Button text='Send' icon={true} />
        </div>
      </form>
    </div>
  );
}

export default SupportContactForm;
