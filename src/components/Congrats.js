import React from 'react'

import languageContext from '../contexts/languageContext'
import successContext from '../contexts/successContext'
import strings from '../helpers/strings'

const Congrats = () => {
	// no need to destructure setter
	const [success] = successContext.useSuccess()
	const language = React.useContext(languageContext)

	if (success) {
		return (
			<div data-test='component-congrats' className='alert alert-success'>
				<span data-test='congrats-message'>
					{/* no need to provide 3rd argument, let it default to languageStrings because we are not testing */}
					{strings.getStringByLanguage(language, 'congrats')}
				</span>
			</div>
		)
	} else return <div data-test='component-congrats' />
}

export default Congrats
