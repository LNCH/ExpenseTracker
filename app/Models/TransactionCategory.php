<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Lnch\LaravelToolkit\Concerns\GeneratesUuidOnCreation;

class TransactionCategory extends Model
{
    use GeneratesUuidOnCreation;
    use HasFactory;

    protected $fillable = [
        'name',
        'icon',
        'colour',
    ];
}
