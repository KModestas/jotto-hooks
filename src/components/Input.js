import React from 'react'
import PropTypes from 'prop-types'

import strings from '../helpers/strings'
import languageContext from '../contexts/languageContext'

const Input = ({ secretWord }) => {
	const language = React.useContext(languageContext)
	// should not destructure hooks from React for test mocks to work
	const [currentGuess, setCurrentGuess] = React.useState('')
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
						setCurrentGuess('')
					}}>
					{strings.getStringByLanguage(language, 'submit')}
				</button>
			</form>
		</div>
	)
}

Input.propTypes = {
	secretWord: PropTypes.string.isRequired
}

export default Input
