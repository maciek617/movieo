import { supabase } from '../App';

export const uploadFile = async (where: string, what: string, file: any) => {
  const { data, error } = await supabase.storage
    .from(where)
    .upload(what, file, {
      cacheControl: '3600',
      upsert: false,
    });

  console.log(data);
  console.log(error);
};
