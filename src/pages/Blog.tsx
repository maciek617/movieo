import Button from '../components/Button';
import Heading from '../components/Heading';

function Blog() {
  return (
    <div className='bg-main-dark min-h-screen pt-32'>
      <Heading
        title='Read about past, present and future of Movieo!'
        description=' Read about our latest updates, plans and others! Help us grow best film
        community in the world!'
      />
      <div className='container mx-auto px-4 flex gap-10 flex-wrap justify-center mt-10'>
        <div className='max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
            Noteworthy technology acquisitions 2021
          </h5>
          <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <p className='text-gray-400 mb-3'>23 Sep 2023</p>
          <Button text='Read more' icon={true} />
        </div>
        <div className='max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700'>
          <a href='#'>
            <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
              Noteworthy technology acquisitions 2021
            </h5>
          </a>
          <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <p className='text-gray-400 mb-3'>23 Sep 2023</p>
          <Button text='Read more' icon={true} />
        </div>
        <div className='max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700'>
          <a href='#'>
            <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
              Noteworthy technology acquisitions 2021
            </h5>
          </a>
          <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <p className='text-gray-400 mb-3'>23 Sep 2023</p>
          <Button text='Read more' icon={true} />
        </div>
      </div>
    </div>
  );
}

export default Blog;
