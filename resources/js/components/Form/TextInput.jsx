import React from 'react'

const TextInput = (props) => {
    const getClasses = () => {
        const defaultClasses = props.className.split(' ')
        defaultClasses.push(['text-sm relative inline-block px-4 py-2 rounded border border-gray-300'])
        return defaultClasses.join(' ')
    }

    return (
        <input
            {...props}
            className={getClasses()}
            type="text"
        />
    )
}

TextInput.defaultProps = {
    className: ''
}

export default TextInput
