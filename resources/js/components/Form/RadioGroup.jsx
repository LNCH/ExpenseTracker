import React from 'react'
import PropTypes from "prop-types";

const RadioGroup = ({ label, name, options, onChange }) => {

    const handleChange = (event) => {
        onChange(event)
    }

    return (
        <div className="flex gap-x-2">
            {options.map(option => (
                <div key={name + '_' + option.value}>
                    <input
                        className="absolute left-[-9999px] peer"
                        type="radio"
                        name={name}
                        value={option.value}
                        id={name + '_' + option.value}
                        onChange={handleChange}
                    />
                    <label
                        htmlFor={name + '_' + option.value}
                        className="relative inline-block px-4 py-2 rounded border border-gray-300 cursor-pointer text-sm
                                    peer-checked:bg-gray-200 peer-checked:border-gray-400"
                    >
                        {option.label}
                    </label>
                </div>
            ))}
        </div>
    )
}

RadioGroup.propTypes = {
    onChange: PropTypes.func,
}
RadioGroup.defaultProps = {
    onChange: () => {}
}

export default RadioGroup
