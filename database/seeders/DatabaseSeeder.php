<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Account;
use App\Models\Payee;
use App\Models\Transaction;
use App\Models\TransactionCategory;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Create initial login account
        $coreUser = User::factory()->create([
            'first_name' => 'Tom',
            'last_name' => 'Lynch',
            'email' => 'tom@lnch.co.uk',
            'password' => Hash::make('password'),
        ]);

        Account::factory()->count(10)->for($coreUser, 'owner')->create();

        $users = User::factory(10)->create();

        foreach ($users as $user) {
             Account::factory()
                 ->count(random_int(3, 5))
                 ->for($user, 'owner')
                 ->create();
        }

        Payee::factory()
            ->count(20)
            ->create();

        $transactionCategories = TransactionCategory::factory()
            ->count(20)
            ->create();

        collect($transactionCategories)->each(function ($category) {
            Transaction::factory()
                ->count(200)
                ->create(['category_id' => $category->id]);#
        });
    }
}
