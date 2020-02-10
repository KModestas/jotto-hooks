// this setupTests file runs before any test file, need to set up enzyme adapter here
// CRA configures jest to look for this file name out of the box
// it seems that setupTests needs to be in the root of your src, and tests need to be within src for them to work
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({
	adapter: new Adapter()
})
