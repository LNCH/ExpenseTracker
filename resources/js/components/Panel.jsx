import React from 'react'

const Panel = ({ children }) => (
    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-6">
        <div className="p-6 bg-white border-b border-gray-200">
            {children}
        </div>
    </div>
)

export default Panel
