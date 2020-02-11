import React from 'react'
import { shallow } from 'enzyme'
import { findByTestAttr, checkProps } from './testUtils'
import Input from '../components/Input'

const setup = (secretWord = 'party') => {
	return shallow(<Input secretWord={secretWord} />)
}

test('Input renders without error', () => {
	const wrapper = setup()
	const inputComponent = findByTestAttr(wrapper, 'component-input')
	expect(inputComponent.length).toBe(1)
})

test('Does not throw warning with expected props ', () => {
	checkProps(Input, { secretWord: 'party' })
})

describe('state controlled input field', () => {
	test('state updates value of input box on change', () => {
		// set up a mock function to mickim setState
		const mockSetCurrentGuess = jest.fn()
		// set up another mock function and replace react.useState with it
		React.useState = jest.fn(() => ['', mockSetCurrentGuess])

		const wrapper = setup()
		const inputBox = findByTestAttr(wrapper, 'input-box')

		// create an onChange mock event passing the input a value of 'train' whenever the mockSetCurrentGuess runs
		const mockEvent = { target: { value: 'train' } }
		inputBox.simulate('change', mockEvent)

		expect(mockSetCurrentGuess).toHaveBeenCalledWith('train')
	})
	test('field is cleared upon submit', () => {
		const mockSetCurrentGuess = jest.fn()
		React.useState = jest.fn(() => ['', mockSetCurrentGuess])

		const wrapper = setup()
		const submitButton = findByTestAttr(wrapper, 'submit-button')

		submitButton.simulate('click')
		expect(mockSetCurrentGuess).toHaveBeenCalledWith('')
	})
})
