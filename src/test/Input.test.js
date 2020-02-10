import React from 'react'
import { shallow } from 'enzyme'
import { findByTestAttr, checkProps } from './testUtils'
import Input from '../components/Input'

const setup = (secretWord = 'party') => {
	return shallow(<Input secretWord={secretWord} />)
}

test('Input renders without error', () => {
	const wrapper = setup()
	const input = findByTestAttr(wrapper, 'component-input')
	expect(input.length).toBe(1)
})

test('Does not throw warning with expected props ', () => {
	checkProps(Input, { secretWord: 'party' })
})
