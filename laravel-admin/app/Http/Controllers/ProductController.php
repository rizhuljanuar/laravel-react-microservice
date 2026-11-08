<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return ProductResource::collection(Product::all());
    }

    public function show(string $id)
    {
        return new ProductResource(Product::find($id));
    }

    public function destroy(string $id)
    {
        Product::destroy($id);

        return response()->json(null, 204);
    }
}
