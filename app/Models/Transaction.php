<?php

namespace App\Models;

use Cknow\Money\Casts\MoneyIntegerCast;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Lnch\LaravelToolkit\Concerns\GeneratesUuidOnCreation;

class Transaction extends Model
{
    use GeneratesUuidOnCreation;
    use HasFactory;

    protected $fillable = [
        'type',
        'account_id',
        'payee_id',
        'date',
        'amount',
        'category_id',
        'is_recurring',
        'recurrence_rule',
        'parent_transaction_id',
        'is_essential',
        'notes',
    ];

    protected $casts = [
        'date' => 'datetime',
        'amount' => MoneyIntegerCast::class,
    ];

    protected $with = [
        'payee',
    ];

    /**
     * @return BelongsTo
     */
    public function account(): BelongsTo
    {
        return $this->belongsTo(Account::class);
    }

    /**
     * @return BelongsTo
     */
    public function payee(): BelongsTo
    {
        return $this->belongsTo(Payee::class);
    }
}
