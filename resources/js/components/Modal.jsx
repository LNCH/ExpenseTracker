import React, {useEffect, useState} from 'react'
import CloseIcon from "./Icons/CloseIcon";
import PropTypes from "prop-types";
import PrimaryButton from "./Buttons/PrimaryButton";

const Modal = (props) => {
    const [isOpen, setIsOpen] = useState(true)

    // Prevent body scrolling when open
    useEffect(() => {
        if (isOpen) {
            document.querySelector('body').classList.add('overflow-hidden')
        } else {
            document.querySelector('body').classList.remove('overflow-hidden')
        }
    }, [isOpen])

    const closeModal = () => {
        setIsOpen(false)
    }

    const renderTrigger = () => {
        const triggerContent = (typeof props.renderTrigger === 'string')
            ? props.renderTrigger
            : props.renderTrigger()

        return (
            <PrimaryButton onClick={() => setIsOpen(!isOpen)}>
                {triggerContent}
            </PrimaryButton>
        )
    }

    const renderModal = () => {
        return isOpen ? (
            <div
                className="fixed top-0 right-0 bottom-0 left-0 bg-black/40"
                onClick={closeModal}
            >
                {renderModalContainer()}
            </div>
        ) : null
    }

    const renderModalHeader = () => {
        const headerContent = (typeof props.renderHeader === 'string')
            ? props.renderHeader
            : props.renderHeader()

        return headerContent ? (
            <div className="px-6 py-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <p className="mb-0 font-bold">
                        {headerContent}
                    </p>

                    <button
                        className="inline-block p-2 -mr-2"
                        onClick={closeModal}
                    >
                        <CloseIcon />
                    </button>
                </div>
            </div>
        ) : null
    }

    const renderModalBody = () => {
        return (
            <div className="px-6 py-4">
                {props.children}
            </div>
        )
    }

    const renderModalContainer = () => {
        return (
            <div
                className="absolute min-w-[50%] max-h-[75%]
                    rounded-lg bg-white shadow-lg
                    overflow-auto
                    top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                onClick={(event) => event.stopPropagation()}
            >
                {renderModalHeader()}
                {renderModalBody()}
            </div>
        )
    }

    return (
        <>
            {renderTrigger()}
            {renderModal()}
        </>
    )
}

Modal.propTypes = {
    renderHeader: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
    ]),
    renderTrigger: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
    ]),
}

Modal.defaultProps = {
    renderHeader: () => false,
    renderTrigger: 'Open Modal'
}

export default Modal
