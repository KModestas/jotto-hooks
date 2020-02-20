import React from 'react'
import hookActions from './redux/actions/hookActions'
import languageContext from './contexts/languageContext'

import Congrats from './components/Congrats'
import GuessedWords from './components/GuessedWords'
import Input from './components/Input'
import languagePicker, { LanguagePicker } from './components/LanguagePicker'

const reducer = (state, action) => {
	switch (action.type) {
		case 'setSecretWord':
			return { ...state, secretWord: action.payload }
		case 'setLanguage':
			return { ...state, language: action.payload }
		default:
			throw new Error(`invalid action type: ${action.type}`)
	}
}

const App = props => {
	const [state, dispatch] = React.useReducer(reducer, { secretWord: null, language: 'en' })

	const setSecretWord = secretWord => dispatch({ type: 'setSecretWord', payload: secretWord })
	const setLanguage = secretWord => dispatch({ type: 'setLanguage', payload: language })

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
			<languageContext.Provider value={state.language}>
				<LanguagePicker setLanguage={setLanguage} />
				<Input secretWord={state.secretWord} />
			</languageContext.Provider>
		</div>
	)
}

export default App
