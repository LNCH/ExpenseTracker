import React from 'react'
import IncomeIcon from "../Icons/Transactions/IncomeIcon";
import ExpenseIcon from "../Icons/Transactions/ExpenseIcon";
import TransferIcon from "../Icons/Transactions/TransferIcon";
import UnknownIcon from "../Icons/Transactions/UnknownIcon";

const TransactionListItem = ({ transaction }) => {
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

    return (
        <div className="flex items-center w-full pl-2 pr-4 py-2 hover:bg-gray-50">
            <div className="p-4 mr-6">
                {renderTransactionIcon(transaction.type)}
            </div>
            <div className="mr-auto">
                {transaction.payee.name}
            </div>
            <div className="text-right">
                <p className="font-semibold">{transaction.amount.formatted}</p>
                <p className="text-sm text-gray-500">{transaction.current_balance.formatted}</p>
            </div>
        </div>
    )
}

export default TransactionListItem
