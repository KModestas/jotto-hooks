import React from 'react'
import Congrats from './Congrats'
import GuessedWords from './GuessedWords'
import hookActions from '../redux/actions/hookActions'

const reducer = (state, action) => {
	switch (action.type) {
		case 'setSecretWord':
			return { ...state, secretWord: action.payload }
		default:
			throw new Error(`invalid action type: ${action.type}`)
	}
}

const App = props => {
	const [state, dispatch] = React.useReducer(reducer, { secretWord: null })

	const setSecretWord = secretWord => dispatch({ type: 'setSecretWord', payload: secretWord })

	React.useEffect(() => {
		hookActions.getSecretWord(setSecretWord)
	}, [])

	return (
		<div data-test='component-app' className='container'>
			<h1>Jotto</h1>
			<b>Secret Word: {props.secretWord}</b>
			<Congrats success={props.success} />
			<GuessedWords guessedWords={props.guessedWords} />
		</div>
	)
}

export default App
