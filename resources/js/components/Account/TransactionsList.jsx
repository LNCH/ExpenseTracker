import React, {useEffect, useState} from 'react'
import TransactionListItem from "./TransactionListItem";

const TransactionsList = (props) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        setTransactions(props.transactions ?? [])
    }, [props.transactions])

    let lastTransactionDate = null

    const renderTransactionDateTitle = (transaction) => {
        if (transaction.formatted_date !== lastTransactionDate) {
            lastTransactionDate = transaction.formatted_date
            return (
                <li className="text-sm font-bold mt-8 mb-2 first:mt-0 text-gray-700">
                    {lastTransactionDate}
                </li>
            )
        }
    }

    return (
        <ul>
            {transactions.map((transaction) => (
                <React.Fragment key={transaction.uuid}>
                    {renderTransactionDateTitle(transaction)}
                    <li className="border-b border-gray-200 last:border-0">
                        <TransactionListItem transaction={transaction} />
                    </li>
                </React.Fragment>
            ))}
        </ul>
    )
}

export default TransactionsList
