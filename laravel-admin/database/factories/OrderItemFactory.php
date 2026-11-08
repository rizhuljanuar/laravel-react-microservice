<?php

namespace Database\Factories;

use App\Models\OrderItem;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<OrderItem>
 */
class OrderItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_title' => fake()->text(30),
            'price'         => fake()->numberBetween(10, 100),
            'quantity'      => fake()->numberBetween(1, 5),
        ];
    }
}
