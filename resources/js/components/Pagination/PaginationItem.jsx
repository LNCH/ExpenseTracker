import React from 'react'
import PropTypes from "prop-types";

const PaginationItem = ({children, onClick, active}) => {
    const getLinkClasses = () => {
        const classes = [
            "w-10", "h-10", "border", "border-gray-100", "text-sm", "rounded-full", "mx-1",
            "hover:bg-blue-800", "hover:text-white"
        ]

        if (active) {
            classes.push('bg-blue-800')
            classes.push('text-white')
        }

        return classes.join(' ')
    }

    return (
        <li className="">
            <button
                onClick={() => onClick()}
                className={getLinkClasses()}
            >
                {children}
            </button>
        </li>
    )
}

PaginationItem.propTypes = {
    active: PropTypes.bool
}

PaginationItem.defaultProps = {
    active: false
}

export default PaginationItem
