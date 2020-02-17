import React from 'react'
import { mount } from 'enzyme'
import { findByTestAttr } from './testUtils'
import App from '../components/App'

import hookActions from '../redux/actions/hookActions'

const mockSecretWord = jest.fn()

const setup = () => {
	// before each test
	// clear mock function
	mockSecretWord.mockClear()
	// replace the real function with mock
	hookActions.secretWord = mockSecretWord
	// using mount instead of shallow which is not yet usable with useEffect
	return mount(<App success={false} guessedWords={[{ guessedWord: 'yo', letterMatchCount: 0 }]} />)
}

test('App renders without error', () => {
	const wrapper = setup()
	const component = findByTestAttr(wrapper, 'component-app')
	expect(component.length).toBe(1)
})

describe('getSecretWord', () => {
	test('is called on app Mount', () => {
		setup()
		expect(mockSecretWord).toHaveBeenCalled()
	})
	test('is called on app Mount', () => {})
})
