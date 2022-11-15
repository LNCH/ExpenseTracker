import React from 'react'

const Label = (props) => {
    return (
        <label className="block mb-2 text-sm">
            {props.children}
        </label>
    )
}

export default Label
