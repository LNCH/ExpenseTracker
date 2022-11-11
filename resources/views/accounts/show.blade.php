<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ $account->name }}
        </h2>
    </x-slot>

    <div class="py-12">

        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <x-account.statistics :account="$account"></x-account.statistics>

            <h2 class="text-lg font-medium leading-6 text-gray-900 mt-6">Transactions</h2>

            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-6">
                <div class="p-6 bg-white border-b border-gray-200">
                    <table class="w-full">
                        <thead>
                            <tr>
                                <th class="w-32">Type</th>
                                <th class="w-36">Date</th>
                                <th>Retailer</th>
                                <th class="w-32">Amount</th>
                                <th class="w-32">Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($account->transactions as $transaction)
                                <tr>
                                    <td class="px-3 py-2 border border-gray-200">
                                        {{ $transaction->type }}
                                    </td>
                                    <td class="px-3 py-2 border border-gray-200 text-sm">
                                        {{ $transaction->date->format('d/m/Y H:i') }}
                                    </td>
                                    <td class="px-3 py-2 border border-gray-200">

                                    </td>
                                    <td class="px-3 py-2 border border-gray-200 text-right">
                                        {{ $transaction->amount }}
                                    </td>
                                    @if ($currentBalance = $transaction->account->getBalanceForDate($transaction->date))
                                        <td class="px-3 py-2 border border-gray-200 text-right @if ($currentBalance->getAmount() < 0) text-red-700 @endif">
                                            {{ $currentBalance }}
                                        </td>
                                    @endif
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
