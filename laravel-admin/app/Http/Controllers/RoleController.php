<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index()
    {
        return Role::all();
    }

    public function store(Request $request)
    {
        $role = Role::create(['name' => $request->input('name')]);

        return response()->json($role, 201);
    }

    public function show(string $id)
    {
        return Role::find($id);
    }

    public function update(Request $request, string $id)
    {
        $role = Role::find($id);

        $role->update($request->only('name'));

        return response()->json($role, 202);
    }

    public function destroy(string $id)
    {
        Role::destroy($id);

        return response()->json(null, 204);
    }
}
