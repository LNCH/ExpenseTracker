<?php

namespace Database\Factories;

use App\Enums\AccountType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Account>
 */
class AccountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $type = fake()->randomElement(AccountType::cases());

        $availableOverdraft = $type === AccountType::CURRENT_ACCOUNT
            ? random_int(1, 10) * 100
            : null;

        return [
            'uuid' => fake()->uuid(),
            'name' => ucwords(fake()->words(3, true)),
            'type' => $type,
            'opening_balance' => random_int($availableOverdraft ? $availableOverdraft * -1 : 0, 10_000),
            'overdraft_available' => $availableOverdraft,
            'credit_limit' => $type === AccountType::CREDIT_CARD
                ? random_int(5, 300) * 10
                : null,
        ];
    }
}
