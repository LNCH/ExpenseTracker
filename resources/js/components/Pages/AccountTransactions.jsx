import React from 'react'
import {createRoot} from "react-dom/client";
import Transactions from "../Account/Transactions";
import Panel from "../Panel";
import TransactionModal from "../Account/TransactionModal";

const AccountTransactions = ({ accountId }) => {
    return (
        <>
            <div className="flex items-center justify-between mt-6">
                <h2 className="text-lg font-medium leading-6 text-gray-900">
                    Transactions
                </h2>

                <div>
                    <TransactionModal
                        accountId={accountId}
                        onSubmit={() => console.log()}
                    />
                </div>
            </div>

            <Panel>
                <Transactions accountId={accountId} />
            </Panel>
        </>
    )
}

const rootElement = document.getElementById('account-transactions');

if (rootElement) {
    createRoot(rootElement).render(<AccountTransactions accountId={rootElement.dataset.accountId} />)
}
