<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    protected function total(): Attribute
    {
        return Attribute::get(fn () => $this->orderItems->sum(
            fn ($item) => $item->price * $item->quantity
        ));
    }
}
