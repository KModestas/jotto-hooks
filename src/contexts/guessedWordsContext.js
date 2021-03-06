import React from 'react'

// no default value
const guessedWordsContext = React.createContext()

export const useGuessedWords = () => {
	// useContext is a hook that returns the context value
	// In this case, the context value is a [value, setter] array for the context state
	// useContext also subscribes to changes, and will update any time the context value updates
	// we've memoized this so that it will only update when the guessedWords value updates
	const context = React.useContext(guessedWordsContext)

	// throw an error if the context doesn't exist -- means we aren't in a provider
	if (!context) throw new Error('useGuessedWords must be used within a GuessedWordsProvider')

	return context
}

export const GuessedWordsProvider = props => {
	// create state that will be used within the provider
	const [guessedWords, setGuessedWords] = React.useState([])
	// value for the context provider will be array of [value, setter] for guessedWords state
	// useMemo just ensures that the provider value will only update when guessedWords updates
	// No need to test this -- React tests useMemo for us!
	const value = React.useMemo(() => [guessedWords, setGuessedWords], [guessedWords])
	// Return a Provider component with the [value, setter] array as the value, passing through the props
	return <guessedWordsContext.Provider value={value} {...props} />
}

export default { GuessedWordsProvider, useGuessedWords }
