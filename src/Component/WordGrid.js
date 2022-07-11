import React from 'react'
import './WordGrid.css';
function WordGrid({ word, solution, validate, finished }) {
  const row = [];
  let backgroundColor = '';
  const renderRow = () => {
    for (let i = 0; i < 5; i += 1) {
      const char = word[i];
      if (validate) {
        if (solution.charAt(i) === char) {          
          backgroundColor = 'lightGreen';
        }
        else if (solution.includes(char)) {          
          backgroundColor = 'yellow';
        }
        else if (!solution.includes(char)) {          
          backgroundColor = 'lightgrey';
        } else{
          backgroundColor = 'white';
        }
      }
      row.push(<div key={`${word}-div${i}`} className='box' style={{backgroundColor:backgroundColor  }}>{char}</div>)
    }
    return row;
  }
  return (
    <div className="container">
      {renderRow()}
    </div>
  )
}

export default WordGrid