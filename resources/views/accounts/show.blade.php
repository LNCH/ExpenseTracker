<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ $account->name }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">

                    <ul>
                        <li>
                            <strong>Type:</strong> {{ $account->type }}
                        </li>
                        <li>
                            <strong>Opening Balance:</strong> {{ $account->opening_balance }}
                        </li>
                        @if ($account->type == 'credit')
                            <li>
                                <strong>Credit Limit:</strong> {{ $account->credit_limit }}
                            </li>
                        @endif
                        @if ($account->type == 'current')
                            <li>
                                <strong>Overdraft Available:</strong> {{ $account->overdraft_available }}
                            </li>
                        @endif
                    </ul>

                </div>
            </div>
        </div>
    </div>
</x-app-layout>
