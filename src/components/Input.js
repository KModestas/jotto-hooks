import React from 'react'
import PropTypes from 'prop-types'

import strings from '../helpers/strings'
import { getLetterMatchCount } from '../helpers'
import languageContext from '../contexts/languageContext'
import successContext from '../contexts/successContext'
import guessedWordsContext from '../contexts/guessedWordsContext'

const Input = ({ secretWord }) => {
	const language = React.useContext(languageContext)
	const [success, setSuccess] = successContext.useSuccess()
	const [guessedWords, setGuesedWords] = guessedWordsContext.useGuessedWords()
	const [currentGuess, setCurrentGuess] = React.useState('')

	if (success) return null

	return (
		<div data-test='component-input'>
			<form className='form-inline'>
				<input
					data-test='input-box'
					className='mb-2 mx-sm-3'
					type='text'
					placeholder={strings.getStringByLanguage(language, 'guessInputPlaceholder')}
					onChange={e => setCurrentGuess(e.target.value)}
					value={currentGuess}
				/>
				<button
					data-test='submit-button'
					className='btn btn-primary mb-2'
					onClick={e => {
						e.preventDefault()

						const letteMatchCount = getLetterMatchCount(currentGuess, secretWord)
						const newGuessedWords = [
							...guessedWords,
							{ guessedWord: currentGuess, letteMatchCount }
						]

						setGuesedWords(newGuessedWords)

						if (currentGuess === secretWord) setSuccess(true)
						// clear input box
						setCurrentGuess('')
					}}>
					{strings.getStringByLanguage(language, 'submit')}
				</button>
			</form>
		</div>
	)
}

Input.propTypes = { secretWord: PropTypes.string.isRequired }

export default Input
