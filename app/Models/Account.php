<?php

namespace App\Models;

use App\Enums\AccountType;
use Cknow\Money\Casts\MoneyIntegerCast;
use Cknow\Money\Money;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
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
     * @return Money
     */
    public function getBalanceAttribute(): Money
    {
        return new Money(2345);
    }
}
