import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr, checkProps } from './testUtils'
import Congrats from '../components/Congrats'

// declare default props to be passed into components when testing. Make sure these prop mimick actual props in your application, otherwise tests may pass when they actually shouldn't
const defaultProps = { success: false }

const setup = (props = {}) => {
	const setupProps = { ...defaultProps, ...props }
	return shallow(<Congrats {...setupProps} />)
}

test('renders without crashing', () => {
	const wrapper = setup()
	const component = findByTestAttr(wrapper, 'component-congrats')
	expect(component.length).toBe(1)
})

test("renders no text when 'success' prop is false", () => {
	const wrapper = setup()
	const component = findByTestAttr(wrapper, 'component-congrats')
	expect(component.text()).toBe('')
})

test("renders non-empty congrats message when 'success' prop is true", () => {
	const wrapper = setup({ success: true })
	const message = findByTestAttr(wrapper, 'congrats-message')
	expect(message.text().length).not.toBe(0)
})

test('does not throw warning with expected props', () => {
	const expectedProps = { success: false }
	checkProps(Congrats, expectedProps)
})
