import React from 'react'
import Congrats from './components/Congrats'
import GuessedWords from './components/GuessedWords'
import hookActions from './redux/actions/hookActions'
import Input from './components/Input'

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

	if (!state.secretWord) {
		return (
			<div className='container' data-test='spinner'>
				<div className='spinner-border' role='status'>
					<span className='sr-only'>Loading...</span>
				</div>
			</div>
		)
	}

	return (
		<div className='container' data-test='component-app'>
			<h1>Jotto</h1>
			<Input secretWord={state.secretWord} />
		</div>
	)
}

export default App
