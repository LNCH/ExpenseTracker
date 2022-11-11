import React, {useEffect, useState} from 'react'
import {createRoot} from "react-dom/client";
import IncomeIcon from "../Icons/Transactions/IncomeIcon";
import ExpenseIcon from "../Icons/Transactions/ExpenseIcon";
import TransferIcon from "../Icons/Transactions/TransferIcon";
import UnknownIcon from "../Icons/Transactions/UnknownIcon";

const Transactions = (props) => {
    const [loadingTransactions, setLoadingTransactions] = useState(false)
    const [transactions, setTransactions] = useState([])
    const [pagination, setPagination] = useState({})

    let lastTransactionDate = null

    useEffect(() => {
        async function fetchTransactions() {
            setLoadingTransactions(true)

            await axios.get(route('web-api.account.transactions.index', props.accountId))
                .then((data) => {
                    setTransactions(data.data.data)
                    setPagination(data.meta)
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => {
                    setLoadingTransactions(false)
                })
        }

        fetchTransactions();
    }, []);

    const renderTransactionIcon = (transactionType) => {
        if (transactionType === 'income') {
            return <IncomeIcon colour={'green'} />
        } else if (transactionType === 'expense') {
            return <ExpenseIcon colour={'#bf0101'} />
        } else if (transactionType === 'transfer') {
            return <TransferIcon colour={'#0992dd'} />
        } else {
            return <UnknownIcon />
        }
    }

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
                    <li
                        className="border-b border-gray-200 last:border-0"
                    >
                        <div className="flex items-center w-full pl-2 pr-4 py-2 hover:bg-gray-50">
                            <div className="p-4 mr-6">
                                {renderTransactionIcon(transaction.type)}
                            </div>
                            <div className="mr-auto">
                                Tesco
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">{transaction.amount.formatted}</p>
                                <p className="text-sm text-gray-500">{transaction.current_balance.formatted}</p>
                            </div>
                        </div>
                    </li>
                </React.Fragment>
            ))}
        </ul>
    )
}

export default Transactions;

const rootElement = document.getElementById('account-transactions');

if (rootElement) {
    createRoot(rootElement).render(<Transactions accountId={rootElement.dataset.accountId} />)
}
