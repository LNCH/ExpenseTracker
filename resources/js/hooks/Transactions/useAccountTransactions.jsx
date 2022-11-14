import React, {useEffect, useState} from "react";
import TransactionsService from "../../services/TransactionsService";

const useAccountTransactions = (accountId, page) => {
    const [loadingTransactions, setLoadingTransactions] = useState(false)
    const [transactions, setTransactions] = useState([])
    const [pagination, setPagination] = useState({})

    useEffect(() => {
        async function fetchTransactions() {
            setLoadingTransactions(true)

            await TransactionsService.getAccountTransactions(accountId, page)
                .then((data) => {
                    setTransactions(data.data.data)
                    setPagination(data.data.meta)
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => {
                    setLoadingTransactions(false)
                })
        }

        fetchTransactions();
    }, [page]);

    return { transactions, loadingTransactions, pagination }
}

export default useAccountTransactions
