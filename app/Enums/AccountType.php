<?php

namespace App\Enums;

use Illuminate\Support\Str;

enum AccountType: string
{
    case CURRENT_ACCOUNT = 'current';
    case SAVINGS_ACCOUNT = 'savings';
    case CREDIT_CARD = 'credit-card';

    /**
     * @return string
     */
    public function getFormattedName(): string
    {
        return ucwords(str($this->name)->lower()->replace('_', ' '));
    }
}
