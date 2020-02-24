import React from 'react'

import strings from '../helpers/strings'
import languageContext from '../contexts/languageContext'

const GuessedWords = () => {
	const guessedWords = []
	const language = React.useContext(languageContext)
	let contents
	if (guessedWords.length === 0) {
		contents = (
			<span data-test='guess-instructions'>
				{strings.getStringByLanguage(language, 'guessPrompt')}
			</span>
		)
	} else {
		const guessedWordsRows = guessedWords.map((word, i) => (
			<tr data-test='guessed-word' key={i}>
				<td>{word.guessedWord}</td>
				<td>{word.letterMatchCount}</td>
			</tr>
		))
		contents = (
			<div data-test='guessed-words'>
				<h3>{strings.getStringByLanguage(language, 'guessedWords')}</h3>
				<table className='table table-sm'>
					<thead className='thead-light'>
						<tr>
							<th>{strings.getStringByLanguage(language, 'guessColumnHeader')}</th>
							<th>{strings.getStringByLanguage(language, 'matchingLettersColumnHeader')}</th>
						</tr>
					</thead>
					<tbody>{guessedWordsRows}</tbody>
				</table>
			</div>
		)
	}
	return <div data-test='component-guessed-words'>{contents}</div>
}

export default GuessedWords
