<?php

namespace Database\Factories;

use App\Enums\TransactionType;
use App\Models\Account;
use App\Models\TransactionCategory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'uuid' => Str::uuid(),
            'type' => fake()->randomElement(TransactionType::cases()),
            'account_id' => Account::query()->inRandomOrder()->first()->id,
            'date' => fake()->date(),
            'amount' => random_int(100, 20_000),
            'category_id' => TransactionCategory::query()->inRandomOrder()->first()->id,
            'is_recurring' => false,
            'recurrence_rule' => null,
            'parent_transaction_id' => null,
            'is_essential' => fake()->boolean(75),
            'notes' => fake()->paragraph(),
        ];
    }
}
