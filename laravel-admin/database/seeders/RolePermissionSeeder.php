<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = Role::where('name', 'admin')->first();
        $editor = Role::where('name', 'editor')->first();
        $viewer = Role::where('name', 'viewer')->first();

        foreach (Permission::all() as $permission) {
            DB::table('role_permission')->insert([
                'role_id'       => $admin->id,
                'permission_id' => $permission->id,
            ]);
        }

        foreach (Permission::where('name', 'not like', '%roles%')->get() as $permission) {
            DB::table('role_permission')->insert([
                'role_id'       => $editor->id,
                'permission_id' => $permission->id,
            ]);
        }

        foreach (Permission::where('name', 'like', 'view_%')->get() as $permission) {
            DB::table('role_permission')->insert([
                'role_id'       => $viewer->id,
                'permission_id' => $permission->id,
            ]);
        }
    }
}
