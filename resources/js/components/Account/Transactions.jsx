import React, {useEffect, useState} from 'react'
import {createRoot} from "react-dom/client";

const Transactions = (props) => {
    const [loadingTransactions, setLoadingTransactions] = useState(false)
    const [transactions, setTransactions] = useState([])
    const [pagination, setPagination] = useState({})

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

    return (
        <table className="w-full">
            <thead>
                <tr>
                    <th className="w-32">Type</th>
                    <th className="w-36">Date</th>
                    <th>Retailer</th>
                    <th className="w-32">Amount</th>
                    <th className="w-32">Balance</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction) => (
                    <tr key={transaction.uuid}>
                        <td className="px-3 py-2 border border-gray-200">
                            { transaction.type }
                        </td>
                        <td className="px-3 py-2 border border-gray-200 text-sm">
                            { transaction.formatted_date }
                        </td>
                        <td className="px-3 py-2 border border-gray-200">
                            -
                        </td>
                        <td className="px-3 py-2 border border-gray-200 text-right">
                            { transaction.amount.formatted }
                        </td>
                        <td className="px-3 py-2 border border-gray-200 text-right">
                            { transaction.current_balance.formatted }
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Transactions;

const rootElement = document.getElementById('account-transactions');

if (rootElement) {
    createRoot(rootElement).render(<Transactions accountId={rootElement.dataset.accountId} />)
}
