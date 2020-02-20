import React from 'react'
import { shallow, mount } from 'enzyme'

import successContext from '../contexts/successContext'

// component not wrapper with successProvider but still using useSuccesss
const FunctionalComponent = () => {
	successContext.useSuccess()
	return <div />
}

test('useSuccess throws error when not wrapped with successProvider ', () => {
	expect(() => {
		shallow(<FunctionalComponent />)
	}).toThrow('useSuccess must be used within a SuccessProvider')
})

test('useSuccess does not throw error when wrapped in successProvider', () => {
	expect(() => {
		mount(
			// no need to pass value in as its already embedded within the context (because of the HOC)
			<successContext.SuccessProvider>
				<FunctionalComponent />
			</successContext.SuccessProvider>
		)
	})
		// remmeber this should be at the end of expect
		.not.toThrow()
})
