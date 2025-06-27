export const getMissingLetter = (word: string) => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const used = new Set(word.toLowerCase().replace(/[^a-z]/g, ""));

  for (let char of alphabet) {
    if (!used.has(char)) {
      return char;
    }
  }
  return "-";
};
