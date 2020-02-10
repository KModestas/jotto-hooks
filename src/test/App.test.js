import React from 'react'
import { shallow } from 'enzyme'
import { findByTestAttr } from './testUtils'
import App from '../components/App'

const setup = () => {
	return shallow(
		<App success={false} guessedWords={[{ guessedWord: 'yo', letterMatchCount: 0 }]} />
	)
}

test('App renders without error', () => {
	const wrapper = setup()
	const component = findByTestAttr(wrapper, 'component-app')
	expect(component.length).toBe(1)
})
