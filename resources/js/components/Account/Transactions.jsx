import React, {useEffect, useState} from 'react'
import {createRoot} from "react-dom/client";
import useAccountTransactions from "../../hooks/Transactions/useAccountTransactions";
import TransactionsList from "./TransactionsList";
import Pagination from "../Pagination/Pagination";

const Transactions = (props) => {
    const [page, setPage] = useState(1)

    const {
        transactions,
        loadingTransactions,
        pagination
    } = useAccountTransactions(props.accountId, page);

    return loadingTransactions ? (
        <p>Loading transactions...</p>
    ) : (
        <>
            <TransactionsList
                transactions={transactions}
            />
            <Pagination
                paginationData={pagination}
                setPage={setPage}
                renderFirstLinkContent={() => '&#171;'}
                renderLastLinkContent={() => '&#187;'}
                renderPreviousLinkContent={() => '&#8249;'}
                renderNextLinkContent={() => '&#8250;'}
            />
        </>
    )
}

export default Transactions;

const rootElement = document.getElementById('account-transactions');

if (rootElement) {
    createRoot(rootElement).render(<Transactions accountId={rootElement.dataset.accountId} />)
}
