import React from 'react'
import Congrats from './Congrats'
import GuessedWords from './GuessedWords'

const App = props => {
	return (
		<div className='container'>
			<h1>Jotto</h1>
			<b>Secret Word: {props.secretWord}</b>
			<Congrats success={props.success} />
			<GuessedWords guessedWords={props.guessedWords} />
		</div>
	)
}

export default App
