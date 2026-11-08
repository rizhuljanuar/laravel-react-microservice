<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoleResource;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class RoleController extends Controller
{
    public function index()
    {
        Gate::authorize('view', 'roles');

        return Role::all();
    }

    public function show(string $id)
    {
        Gate::authorize('view', 'roles');

        return Role::find($id);
    }

    public function store(Request $request)
    {
        Gate::authorize('edit', 'roles');

        $role = Role::create(['name' => $request->input('name')]);

        if ($permissions = $request->input('permissions')) {
            foreach ($permissions as $permission) {
                DB::table('role_permission')->insert([
                    'role_id'       => $role->id,
                    'permission_id' => $permission,
                ]);
            }
        }

        return response()->json(new RoleResource($role), 201);
    }

    public function update(Request $request, string $id)
    {
        Gate::authorize('edit', 'roles');

        $role = Role::find($id);

        $role->update($request->only('name'));

        DB::table('role_permission')->where('role_id', $role->id)->delete();

        if ($permissions = $request->input('permissions')) {
            foreach ($permissions as $permission) {
                DB::table('role_permission')->insert([
                    'role_id'       => $role->id,
                    'permission_id' => $permission,
                ]);
            }
        }

        return response()->json(new RoleResource($role), 202);
    }

    public function destroy(string $id)
    {
        Gate::authorize('edit', 'roles');

        DB::table('role_permission')->where('role_id', $id)->delete();

        Role::destroy($id);

        return response()->json(null, 204);
    }
}
