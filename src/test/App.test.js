import React from 'react'
import { mount } from 'enzyme'
import { findByTestAttr } from './testUtils'
import App from '../components/App'

// scoping globally
const mockSecretWord = jest.fn()

const setup = () => {
	// using mount instead of shallow which is not yet usable with useEffect
	return mount(<App success={false} guessedWords={[{ guessedWord: 'yo', letterMatchCount: 0 }]} />)
}

test('App renders without error', () => {
	const wrapper = setup()
	const component = findByTestAttr(wrapper, 'component-app')
	expect(component.length).toBe(1)
})
