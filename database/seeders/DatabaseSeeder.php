<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Account;
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
        User::factory()->create([
            'first_name' => 'Tom',
            'last_name' => 'Lynch',
            'email' => 'tom@lnch.co.uk',
            'password' => Hash::make('password'),
        ]);

         $users = User::factory(10)->create();

         foreach ($users as $user) {
             Account::factory()
                 ->count(random_int(3, 5))
                 ->for($user, 'owner')
                 ->create();
         }
    }
}
