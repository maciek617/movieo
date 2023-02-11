import { supabase } from '../App';

export const createBucket = async (bucketName: string) => {
  const { data, error } = await supabase.storage.createBucket(bucketName, {
    public: true,
  });

  return error ? error : data;
};
