<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\Order;

class OrderController extends Controller
{
    public function index()
    {
        return OrderResource::collection(Order::with('orderItems')->get());
    }

    public function show(string $id)
    {
        return new OrderResource(Order::with('orderItems')->find($id));
    }

    public function export()
    {
        $orders = Order::with('orderItems')->get();

        $headers = [
            'Content-Type'  => 'text/csv',
            'Cache-Control' => 'no-store, no-cache',
        ];

        $callback = function () use ($orders) {
            $file = fopen('php://output', 'w');

            fputcsv($file, ['id', 'name', 'email', 'product_title', 'price', 'quantity']);

            foreach ($orders as $order) {
                fputcsv($file, [$order->id, $order->name, $order->email, '', '', '']);

                foreach ($order->orderItems as $item) {
                    fputcsv($file, ['', '', '', $item->product_title, $item->price, $item->quantity]);
                }
            }

            fclose($file);
        };

        return response()->streamDownload($callback, 'orders.csv', $headers);
    }
}
