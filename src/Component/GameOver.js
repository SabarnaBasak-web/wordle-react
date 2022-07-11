import React from 'react'

function GameOver({ finished, solution }) {
    return (
        <div>
            {finished ?
                <>
                    <h1>Game Over</h1>
                    <h1>You Won!!</h1>
                </>
                : <h1>Answer is {solution}.<br/> Reload the page to try again </h1>}
        </div >

    )
}

export default GameOver