import React from 'react'
import { mount } from 'enzyme'
import { findByTestAttr } from './testUtils'
import App from '../App'

import hookActions from '../redux/actions/hookActions'

const mockSecretWord = jest.fn()

const setup = (secretWord = 'party') => {
	// before each test
	// clear mock function
	mockSecretWord.mockClear()

	// replace the real function with mock
	hookActions.getSecretWord = mockSecretWord

	// create mock useReducer and replace
	const mockUseReducer = jest.fn().mockReturnValue([{ secretWord }, jest.fn()])
	React.useReducer = mockUseReducer

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
	test('does not update on App update', () => {
		const wrapper = setup()
		// mock will be called on mount, clear the mock and then start fresh to see if it gets triggered again on update
		mockSecretWord.mockClear()
		// for useEffect .update doesnt work, use setProps instead
		wrapper.setProps()
		expect(mockSecretWord).not.toHaveBeenCalled()
	})
})

describe('setSecretWord is not null', () => {
	let wrapper
	beforeEach(() => {
		wrapper = setup('party')
	})
	test('renders app ', () => {
		const appComponent = findByTestAttr(wrapper, 'component-app')
		expect(appComponent.exists()).toBe(true)
	})
	test('does not render spinner ', () => {
		const spinnerComponent = findByTestAttr(wrapper, 'spinner')
		expect(spinnerComponent.exists()).toBe(false)
	})
})

describe('setSecretWord is null', () => {
	let wrapper
	beforeEach(() => {
		wrapper = setup(null)
	})
	test('does not render app ', () => {
		const appComponent = findByTestAttr(wrapper, 'component-app')
		expect(appComponent.exists()).toBe(false)
	})
	test('renders spinner ', () => {
		const spinnerComponent = findByTestAttr(wrapper, 'spinner')
		expect(spinnerComponent.exists()).toBe(true)
	})
})
