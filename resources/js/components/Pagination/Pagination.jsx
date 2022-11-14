import React, {useEffect, useState} from 'react'
import PropTypes from "prop-types";
import PaginationItem from "./PaginationItem";

const Pagination = (props) => {
    const {
        paginationData,
        setPage,
        linksEachSide,
        renderFirstLinkContent,
        renderLastLinkContent,
        renderPreviousLinkContent,
        renderNextLinkContent,
        renderFirstAndLast,
        renderPrevAndNext
    } = props

    const [pagination, setPagination] = useState(paginationData)

    useEffect(() => {
        setPagination(paginationData)
    }, [paginationData])

    const renderFirstPageLink = () => {
        return renderFirstAndLast ? (
            <PaginationItem onClick={() => setPage(1)}>
                <span dangerouslySetInnerHTML={{__html: renderFirstLinkContent()}}></span>
            </PaginationItem>
        ) : null
    }

    const renderPreviousPageLink = () => {
        return renderPrevAndNext ? (
            <PaginationItem onClick={() => setPage(Math.max(pagination.current_page - 1, 1))}>
                <span dangerouslySetInnerHTML={{__html: renderPreviousLinkContent()}}></span>
            </PaginationItem>
        ): null
    }

    const renderPageLinks = () => {
        const firstPageLink = Math.max(1, pagination.current_page - linksEachSide)
        const lastPageLink = Math.min(pagination.last_page, pagination.current_page + linksEachSide)

        let links = []

        for (let currentPage = firstPageLink; currentPage <= lastPageLink; currentPage++) {
            links.push(
                <PaginationItem
                    key={"select-page_"+currentPage}
                    onClick={() => setPage(currentPage)}
                    active={currentPage === pagination.current_page}
                >
                    {currentPage}
                </PaginationItem>
            )
        }

        return links
    }

    const renderNextPageLink = () => {
        return renderPrevAndNext ? (
            <PaginationItem onClick={() => setPage(Math.min(pagination.current_page + 1, pagination.last_page))}>
                <span dangerouslySetInnerHTML={{__html: renderNextLinkContent()}}></span>
            </PaginationItem>
        ) : null
    }

    const renderLastPageLink = () => {
        return renderFirstAndLast ? (
            <PaginationItem onClick={() => setPage(pagination.last_page)}>
                <span dangerouslySetInnerHTML={{__html: renderLastLinkContent()}}></span>
            </PaginationItem>
        ) : null
    }

    return (
        <div className="flex justify-center">
            <ul className="flex mx-auto">
                {renderFirstPageLink()}
                {renderPreviousPageLink()}
                {renderPageLinks()}
                {renderNextPageLink()}
                {renderLastPageLink()}
            </ul>
        </div>
    )
}

Pagination.propTypes = {
    paginationData: PropTypes.object.isRequired,
    setPage: PropTypes.func.isRequired,
    linksEachSide: PropTypes.number,

    renderFirstLinkContent: PropTypes.func,
    renderLastLinkContent: PropTypes.func,
    renderPreviousLinkContent: PropTypes.func,
    renderNextLinkContent: PropTypes.func,

    renderFirstAndLast: PropTypes.bool,
    renderPrevAndNext: PropTypes.bool,
}

Pagination.defaultProps = {
    paginationData: {
        current_page: 1,
        from: 1,
        last_page: 1,
        per_page: 20,
        to: 20,
        total: 20,
    },
    setPage: () => {},
    linksEachSide: 3,

    renderFirstLinkContent: () => 'First',
    renderLastLinkContent: () => 'Last',
    renderPreviousLinkContent: () => 'Prev',
    renderNextLinkContent: () => 'Next',

    renderFirstAndLast: true,
    renderPrevAndNext: true,
}

export default Pagination
