// returns a number of words in a string without dots

export const countSingleWords = (words: string) => {
  return words.replaceAll('.', ' ').trim().split(/\s+/).length;
};
