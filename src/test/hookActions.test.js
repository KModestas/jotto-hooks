import moxios from 'moxios'
import { getSecretWord } from '../redux/actions/hookActions'

describe('moxios tests', () => {
	beforeEach(() => {
		moxios.install()
	})
	afterEach(() => {
		moxios.uninstall()
	})

	test('calls getSecretWord callback on axios response', async () => {
		const secretWord = 'party'

		moxios.wait(() => {
			// intervene the most recent axios request made during this test
			const request = moxios.requests.mostRecent()
			// response with moxios instead
			request.respondWith({
				status: '200',
				response: secretWord
			})
		})

		// create mock for callback argument (then)
		const mockSecretWord = jest.fn()
		await getSecretWord(mockSecretWord)

		// see wether mock was run with the correct argument
		expect(mockSecretWord).toHaveBeenCalledWith(secretWord)
	})
})
