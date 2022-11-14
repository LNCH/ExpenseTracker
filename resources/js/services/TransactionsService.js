const TransactionsService = {
    getAccountTransactions: async (accountId, page) => {
        return await axios.get(route('web-api.account.transactions.index', accountId), {
            params: {
                page: page
            }
        });
    }
}

export default TransactionsService;
