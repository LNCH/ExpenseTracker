<?php

namespace App\Models;

use App\Enums\AccountType;
use App\Enums\TransactionType;
use Carbon\Carbon;
use Cknow\Money\Casts\MoneyIntegerCast;
use Cknow\Money\Money;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Lnch\LaravelToolkit\Concerns\GeneratesUuidOnCreation;

class Account extends Model
{
    use GeneratesUuidOnCreation;
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'name',
        'type',
        'opening_balance',
        'overdraft_available',
        'credit_limit',
    ];

    protected $casts = [
        'type' => AccountType::class,
        'opening_balance' => MoneyIntegerCast::class,
        'overdraft_available' => MoneyIntegerCast::class,
        'credit_limit' => MoneyIntegerCast::class,
    ];

    /**
     * @return string
     */
    public function getRouteKeyName(): string
    {
        return 'uuid';
    }

    /**
     * @return Attribute
     */
    protected function type(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => AccountType::from($value)->getFormattedName()
        );
    }

    /**
     * @return BelongsTo
     */
    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * @return HasMany
     */
    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class)
            ->orderBy('date', 'desc');
    }

    /**
     * @param Carbon $date
     * @return Money
     */
    public function getBalanceForDate(Carbon $date): Money
    {
        $totalIncome = $this->transactions
            ->filter(fn ($transaction) => $transaction->date->isBefore($date->endOfDay()))
            ->where('type', TransactionType::INCOME->value)
            ->reduce(function ($total, $transaction) {
                return $total + $transaction->amount->getAmount();
            }, 0);

        $totalOutgoings = $this->transactions
            ->filter(fn ($transaction) => $transaction->date->isBefore($date->endOfDay()))
            ->whereIn('type', [TransactionType::EXPENSE->value, TransactionType::TRANSFER->value])
            ->reduce(function ($total, $transaction) {
                return $total + $transaction->amount->getAmount();
            }, 0);

        return new Money($this->opening_balance->getAmount() + $totalIncome - $totalOutgoings);
    }

    /**
     * @param Carbon|null $date
     * @return Money
     */
    public function getBalanceAttribute(?Carbon $date = null): Money
    {
        return $this->getBalanceForDate($date ?: now());
    }

    /**
     * @return void
     */
    public function bindCircularTransactionRelations(): void
    {
        $this->setRelation('transactions', $this->transactions->map(function ($transaction) {
            $transaction->setRelation('account', $this);
            return $transaction;
        }));
    }
}
