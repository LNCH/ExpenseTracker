<?php

use App\Http\Controllers\AccountsController;
use App\Http\Controllers\WebApi\Accounts\TransactionsController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('ping', function () {
    return ['pong' => now()];
});

Route::get('account/{account}/transactions', [TransactionsController::class, 'index'])
    ->name('account.transactions.index');
