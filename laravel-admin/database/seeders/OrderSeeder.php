<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $orders = Order::factory()->count(30)->create();

        foreach ($orders as $order) {
            OrderItem::factory()
                ->count(fake()->numberBetween(1, 5))
                ->create(['order_id' => $order->id]);
        }
    }
}
