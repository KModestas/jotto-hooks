import strings from '../helpers/strings'
const { getStringByLanguage } = strings

const testStrings = {
	en: { submit: 'submit' },
	emoji: { submit: '🚀' },
	missingSubmitKey: {}
}

test('returns correct submit string for english', () => {
	const string = getStringByLanguage('en', 'submit', testStrings)
	expect(string).toBe('submit')
})
test('returns the correct submit string for emoji', () => {
	const string = getStringByLanguage('emoji', 'submit', testStrings)
	expect(string).toBe('🚀')
})
test('returns english submit string when language does not exist', () => {
	const string = getStringByLanguage('notALanguage', 'submit', testStrings)
	expect(string).toBe('submit')
})
test('returns english submit string when submit key does not exist for language', () => {
	const string = getStringByLanguage('missingSubmitKey', 'submit', testStrings)
	expect(string).toBe('submit')
})
