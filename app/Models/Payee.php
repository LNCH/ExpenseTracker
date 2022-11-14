<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Lnch\LaravelToolkit\Concerns\GeneratesUuidOnCreation;

class Payee extends Model
{
    use GeneratesUuidOnCreation;
    use HasFactory;

    protected $fillable = [
        'name',
    ];
}
