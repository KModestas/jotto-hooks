import checkPropTypes from 'check-prop-types'

export const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test="${val}"]`)

export const checkProps = (component, expectedProps) => {
	const PropError = checkPropTypes(component.propTypes, expectedProps, 'prop', component.name)
	expect(PropError).toBeUndefined()
}
