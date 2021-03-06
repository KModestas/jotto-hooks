import React from 'react'
import { mount } from 'enzyme'

import { findByTestAttr, checkProps } from './testUtils'
import Input from '../components/Input'
import languageContext from '../contexts/languageContext'
import successContext from '../contexts/successContext'
import guessedWordsContext from '../contexts/guessedWordsContext'

const setup = ({ secretWord = 'party', language = 'en', success = false }) => {
	return mount(
		<languageContext.Provider value={language}>
			{/*  overrde value in successProvider */}
			<successContext.SuccessProvider value={[success, jest.fn()]}>
				<guessedWordsContext.GuessedWordsProvider>
					<Input secretWord={secretWord} />
				</guessedWordsContext.GuessedWordsProvider>
			</successContext.SuccessProvider>
		</languageContext.Provider>
	)
}

test('Input renders without error', () => {
	const wrapper = setup({})
	const inputComponent = findByTestAttr(wrapper, 'component-input')
	expect(inputComponent.length).toBe(1)
})

test('Does not throw warning with expected props ', () => {
	checkProps(Input, { secretWord: 'party' })
})

describe('state controlled input field', () => {
	let mockSetCurrentGuess = jest.fn()
	let wrapper
	beforeEach(() => {
		// set up a mock function to mickim setState
		mockSetCurrentGuess = jest.fn()
		// set up another mock function and replace react.useState with it
		React.useState = jest.fn(() => ['', mockSetCurrentGuess])

		wrapper = setup({})
	})
	test('state updates value of input box on change', () => {
		const inputBox = findByTestAttr(wrapper, 'input-box')

		// create an onChange mock event passing the input a value of 'train' whenever the mockSetCurrentGuess runs
		const mockEvent = { target: { value: 'train' } }
		inputBox.simulate('change', mockEvent)

		expect(mockSetCurrentGuess).toHaveBeenCalledWith('train')
	})
	test('field is cleared upon submit', () => {
		const submitButton = findByTestAttr(wrapper, 'submit-button')

		submitButton.simulate('click', { preventDefault() {} })
		expect(mockSetCurrentGuess).toHaveBeenCalledWith('')
	})
})

describe('language picker', () => {
	test('correctly renders submit string in english', () => {
		const wrapper = setup({ language: 'en' })
		const submitButton = findByTestAttr(wrapper, 'submit-button')
		expect(submitButton.text()).toBe('Submit')
	})
	test('correctly renders submit string in emoji', () => {
		const wrapper = setup({ language: 'emoji' })
		const submitButton = findByTestAttr(wrapper, 'submit-button')
		expect(submitButton.text()).toBe('🚀')
	})
})

test('input component doesnt render when success true', () => {
	const wrapper = setup({ secretWord: 'party', success: true })
	// is empty returns true if component is empty (retuning null or false)
	expect(wrapper.isEmptyRender()).toBe(true)
})
