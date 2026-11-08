<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductUpdateRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        Gate::authorize('view', 'products');

        return ProductResource::collection(Product::all());
    }

    public function show(string $id)
    {
        Gate::authorize('view', 'products');

        return new ProductResource(Product::find($id));
    }

    public function destroy(string $id)
    {
        Gate::authorize('edit', 'products');

        Product::destroy($id);

        return response()->json(null, 204);
    }

    public function store(Request $request)
    {
        Gate::authorize('edit', 'products');

        $product = Product::create($request->only('title', 'description', 'image', 'price'));

        return response()->json(new ProductResource($product), 201);
    }

    public function update(ProductUpdateRequest $request, string $id)
    {
        Gate::authorize('edit', 'products');

        $product = Product::find($id);

        $product->update($request->only('title', 'description', 'image', 'price'));

        return response()->json(new ProductResource($product), 202);
    }
}
