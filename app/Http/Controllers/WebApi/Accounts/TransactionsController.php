<?php

namespace App\Http\Controllers\WebApi\Accounts;

use App\Http\Controllers\Controller;
use App\Http\Resources\TransactionResource;
use App\Models\Account;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class TransactionsController extends Controller
{
    /**
     * @param Account $account
     * @return AnonymousResourceCollection
     */
    public function index(Account $account): AnonymousResourceCollection
    {
        // Get the initial collection to paginate
        $transactions = $account->transactions()
            ->paginate(20);

        // Transform the collection to bind the circular relation issue
        $transactions->setCollection(
            $transactions->getCollection()
                ->map(function ($transaction) use ($account) {
                    $transaction->setRelation('account', $account);
                    return $transaction;
                })
        );

        // Return the resource collection
        return TransactionResource::collection($transactions);
    }

    public function store(Request $request, Account $account)
    {
        $transaction = Transaction::factory()
            ->create([
                'account_id' => $account->id,
                'type' => $request->type,
                'date' => now()
            ]);

        return new TransactionResource($transaction);
    }
}
