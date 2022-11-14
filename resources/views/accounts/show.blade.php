<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ $account->name }}
        </h2>
    </x-slot>

    <div class="py-12">

        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <x-account.statistics :account="$account"></x-account.statistics>

            <div
                id="account-transactions"
                data-account-id="{{ $account->uuid }}"
            ></div>
        </div>
    </div>
</x-app-layout>
