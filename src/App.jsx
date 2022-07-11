import { useState, useEffect, useCallback } from 'react';
import './App.css';
import GameOver from './Component/GameOver';
import WordGrid from './Component/WordGrid';
import { fetchWord } from './wordleService'
/*
Rules 
1. 6 letter words 
2. if the alphabets are in correct place then it the block turns green
3. if the letter exists in the word but its not in the correct place then it turns yellow 
4. if the word is not there then the word turns grey 
5. keyboard at the bottom that show which all the words are used and unused words 
*/
function App() {
  const [guesses, setGuesses] = useState(Array(5).fill(null));
  const [solution, setSolution] = useState('');
  const [enteredWord, setEnteredWord] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const alphabetRegex = /^[a-z]*$/;

  const getCurrentGuessIndex = (index) => {
    const isCurrentGuess = index === guesses.findIndex(val => val === null);
    return isCurrentGuess
  }

  useEffect(() => {
    setSolution(fetchWord());
  }, []);

  useEffect(() => {
    const inputHandler = (e) => {
      if (e.key === "Enter") {
        const isCorrect = solution === enteredWord;
        if (isCorrect) {
          setIsGameOver(true);
          setIsFinished(true);
          return;
        } else {
          const newGuesses = [...guesses];
          const index = guesses.findIndex(val => val === null);
          newGuesses[index] = enteredWord;
          if (index === 4) {            
            setIsGameOver(true);
            setIsFinished(false);
          }
          setGuesses(newGuesses);
          setEnteredWord("");

          return;
        }
      }
      else if (e.key === 'Backspace') {
        setEnteredWord(word => word.slice(0, -1))
      }
      else if (alphabetRegex.test(e.key)) {
        setEnteredWord(prev => prev + e.key.toUpperCase());
      }
    }

    window.addEventListener('keydown', inputHandler);
    return () => {
      window.removeEventListener('keydown', inputHandler);
    }
  }, [enteredWord, guesses, solution, alphabetRegex]);


  return (
    <div className="App">
      <h1>Wordle Game </h1>
      {!isGameOver ? guesses.map((guess, index) => {
        const isCurrentGuess = getCurrentGuessIndex(index);
        return <WordGrid key={index} word={isCurrentGuess ? enteredWord : guess ?? ''} solution={solution} validate={!isCurrentGuess && guess !== null} />
      }) : <GameOver finished={isFinished} solution={solution}/>}
    </div>
  );
}

export default App;
