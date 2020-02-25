import React from 'react'
import { mount } from 'enzyme'
import { findByTestAttr } from '../testUtils'

import successContext from '../../contexts/successContext'
import guessedWordsContext from '../../contexts/guessedWordsContext'
import Input from '../../components/Input'
import GuessedWords from '../../components/GuessedWords'

// TESTING THE SIMULATION OF SUBMITTING A GUESS

const setup = (guessedWordsStrings = [], secretWord = 'party') => {
	const wrapper = mount(
		<guessedWordsContext.GuessedWordsProvider>
			<successContext.SuccessProvider>
				<Input secretWord={secretWord} />
				<GuessedWords />
			</successContext.SuccessProvider>
		</guessedWordsContext.GuessedWordsProvider>
	)
	const inputBox = findByTestAttr(wrapper, 'input-box')
	const submitButton = findByTestAttr(wrapper, 'submit-button')

	// prepopulate guessedWords context by simulating guess
	// guessedWords does not have the same shape as original, only strings of guessed words
	guessedWordsStrings.map(word => {
		const mockEvent = { target: { value: word } }
		inputBox.simulate('change', mockEvent)
		submitButton.click('click')
	})

	return [wrapper, inputBox, submitButton]
}

describe('test word guesses', () => {
	let wrapper
	let inputBox
	let submitButton

	describe('non-empty guessedWords', () => {
		beforeEach(() => {
			;[wrapper, inputBox, submitButton] = setup(['agile'], 'party')
		})

		describe('correct guess', () => {
			beforeEach(() => {
				const mockEvent = { target: { value: 'party' } }
				inputBox.simulate('change', mockEvent)
				submitButton.simulate('click')
			})
			test('Input components contains no children', () => {
				const inputComponent = findByTestAttr(wrapper, 'component-input')
				expect(inputComponent.children().length).toBe(0)
			})

			test('GuessedWords table row count reflects updated guess', () => {
				const guessedWordsTableRows = findByTestAttr(wrapper, 'guessed-word')
				expect(guessedWordsTableRows.length).toBe(2)
			})
		})

		describe('incorrect guess', () => {})
		beforeEach(() => {
			const mockEvent = { target: { value: 'party' } }
			inputBox.simulate('change', mockEvent)
			submitButton.simulate('click')
		})
		test('Input box remains', () => {
			expect(inputBox.exists()).toBe(true)
		})
		test('GuessedWords table row count reflects updated guess', () => {
			const guessedWordsTableRows = findByTestAttr(wrapper, 'guessed-word')
			expect(guessedWordsTableRows.length).toBe(2)
		})
	})
})
