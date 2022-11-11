<div>
    <h2 class="text-lg font-medium leading-6 text-gray-900">Account Details</h2>

    <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
        <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt class="truncate text-sm font-medium text-gray-500">Type</dt>
            <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{{ $account->type }}</dd>
        </div>

        <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt class="truncate text-sm font-medium text-gray-500">Opening Balance</dt>
            <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{{ $account->opening_balance }}</dd>
        </div>

        <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt class="truncate text-sm font-medium text-gray-500">Balance</dt>
            <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{{ $account->balance }}</dd>
        </div>

        @if ($account->credit_limit || $account->overdraft_available)
            <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                @if ($account->credit_limit)
                    <dt class="truncate text-sm font-medium text-gray-500">Credit Limit</dt>
                    <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{{ $account->credit_limit }}</dd>
                @elseif ($account->overdraft_available)
                    <dt class="truncate text-sm font-medium text-gray-500">Available Overdraft</dt>
                    <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{{ $account->overdraft_available }}</dd>
                @endif
            </div>
        @endif
    </dl>
</div>
