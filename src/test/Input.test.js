import React from 'react'
import { shallow } from 'enzyme'
import { findByTestAttr } from './testUtils'
import Input from '../components/Input'

const setup = () => {
	return shallow(<Input />)
}

test('Input renders without error', () => {
	const wrapper = setup()
	const input = findByTestAttr(wrapper, 'component-input')
	expect(input.length).toBe(1)
})
