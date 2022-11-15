const TransactionsService = {
    getAccountTransactions: async (accountId, page) => {
        return await axios.get(route('web-api.account.transactions.index', accountId), {
            params: {
                page: page
            }
        });
    },

    createTransaction: async (accountId, data) => {
        return await axios.post(route('web-api.account.transactions.store', accountId), data)
    }
}

export default TransactionsService;
