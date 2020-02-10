export const getLetterMatchCount = (guessedWord, secretWord) => {
  // if server isnt running, secretWord will be null causing an error
  secretWord = secretWord ? secretWord : "";
  const secretLetterSet = new Set(secretWord.split(""));
  // => { 'p', 'a', 'r', 't', 'y' }
  const guessedLetterSet = new Set(guessedWord.split(""));
  // "parka" => { 'p', 'a', 'r', 'k' }  - guessedLetterSet will automatically filter out duplicate keys
  return [...secretLetterSet].filter(letter => guessedLetterSet.has(letter))
    .length;
  // [...secretLetterSet] => [ 'p', 'a', 'r', 't', 'y' ]
};

// sets always contain with unique values
// you can chain .add() method because it returns the set itself
// if you try to add a duplicate, it will just return the set without the added duplicate
// .has returns true or false if set contains the element you are checking
// .delete will retun true or false if an element was succesfully deleted (therefore cant be chained)
