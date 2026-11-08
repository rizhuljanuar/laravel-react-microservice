<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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

    public function store(Request $request)
    {
        $file = $request->file('image');

        $name = Str::random(10) . '.' . $file->extension();
        $path = Storage::putFileAs('images', $file, $name);

        $product = Product::create([
            'title'       => $request->input('title'),
            'description' => $request->input('description'),
            'price'       => $request->input('price'),
            'image'       => config('app.url') . '/storage/' . $path,
        ]);

        return response()->json(new ProductResource($product), 201);
    }
}
