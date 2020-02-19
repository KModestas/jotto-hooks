import strings from '../helpers/strings'
const { getStringByLanguage } = strings

const testStrings = {
	en: { submit: 'submit' },
	emoji: { submit: '🚀' },
	missingSubmitKey: {}
}

describe('langauge string tests', () => {
	// create a mock warning
	const mockWarn = jest.fn()
	let originalWarn

	beforeEach(() => {
		originalWarn = console.warn
		console.warn = mockWarn
	})
	// make sure to restore original warning so you can see potential warnings thrown by other tests
	afterEach(() => {
		console.warn = originalWarn
	})

	test('returns correct submit string for english', () => {
		const string = getStringByLanguage('en', 'submit', testStrings)
		expect(string).toBe('submit')
		expect(mockWarn).not.toHaveBeenCalled()
	})
	test('returns the correct submit string for emoji', () => {
		const string = getStringByLanguage('emoji', 'submit', testStrings)
		expect(string).toBe('🚀')
		expect(mockWarn).not.toHaveBeenCalled()
	})
	test('returns english submit string when language does not exist', () => {
		const string = getStringByLanguage('notALanguage', 'submit', testStrings)
		expect(string).toBe('submit')
		expect(mockWarn).toHaveBeenCalledWith('Could not get string [submit] for [notALanguage]')
	})
	test('returns english submit string when submit key does not exist for language', () => {
		const string = getStringByLanguage('missingSubmitKey', 'submit', testStrings)
		expect(string).toBe('submit')
		expect(mockWarn).toHaveBeenCalledWith('Could not get string [submit] for [missingSubmitKey]')
	})
})
