import React from 'react'
import PropTypes from "prop-types";

const PrimaryButton = (props) => {

    const getClasses = () => {
        const existingClasses = props.className.split(' ')

        existingClasses.push(['bg-cyan-800 px-4 py-2 rounded hover:bg-cyan-900 text-white text-sm font-bold transition-colors'])

        return existingClasses.join(' ')
    }

    return (
        <button {...props} className={getClasses()}>

        </button>
    )
}

PrimaryButton.propTypes = {
    className: PropTypes.string
}

PrimaryButton.defaultProps = {
    className: ''
}

export default PrimaryButton
