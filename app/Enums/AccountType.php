<?php

namespace App\Enums;

enum AccountType: string
{
    case CURRENT = 'current';
    case SAVINGS = 'savings';
    case CREDIT_CARD = 'credit-card';
}
