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
                    Transactions...
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
