import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr, checkProps } from './testUtils'
import LanguagePicker from '../components/LanguagePicker'

const mockSetLanguage = jest.fn()

const setup = () => {
	return shallow(<LanguagePicker setLanguage={mockSetLanguage} />)
}

test('renders without error', () => {
	const wrapper = setup()
	const component = findByTestAttr(wrapper, 'component-language-picker')
	expect(component.exists()).toBe(true)
})

test('does not throw warning setLanguagewith expected props', () => {
	// setLanguage should be a func so just pass in a mock function to pass the test
	checkProps(LanguagePicker, { setLanguage: jest.fn() })
})
