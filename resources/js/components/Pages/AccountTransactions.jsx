import React from 'react'
import {createRoot} from "react-dom/client";
import Transactions from "../Account/Transactions";
import Panel from "../Panel";
import Modal from "../Modal";
import PlusSquaresIcon from "../Icons/PlusSquaresIcon";

const AccountTransactions = ({ accountId }) => {
    return (
        <>
            <div className="flex items-center justify-between mt-6">
                <h2 className="text-lg font-medium leading-6 text-gray-900">
                    Transactions
                </h2>

                <div>
                    <Modal
                        renderHeader="New Transaction"
                        renderTrigger={() => (
                            <span className="flex items-center gap-x-1">
                                <PlusSquaresIcon /> New Transaction
                            </span>
                        )}
                    >
                        Modal content here
                    </Modal>
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
