<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateInfoRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        return UserResource::collection(User::with('role')->paginate());
    }

    public function show(string $id)
    {
        return new UserResource(User::with('role')->find($id));
    }

    public function store(UserCreateRequest $request)
    {
        $user = User::create($request->only('first_name', 'last_name', 'email', 'role_id') + [
            'password' => Hash::make('1234'),
        ]);

        return response()->json($user, 201);
    }

    public function update(UserUpdateRequest $request, string $id)
    {
        $user = User::find($id);

        $user->update($request->only('first_name', 'last_name', 'email', 'role_id'));

        return response()->json(new UserResource($user), 202);
    }

    public function destroy(string $id)
    {
        $user = User::destroy($id);

        return response()->json(new UserResource($user), 204);
    }

    public function user(Request $request)
    {
        $user = Auth::user();

        return (new UserResource($user))->additional([
            'permissions' => $user->permissions(),
        ]);
    }

    public function updateInfo(UpdateInfoRequest $request)
    {
        $user = Auth::user();

        $user->update($request->only('first_name', 'last_name', 'email'));

        return response()->json($user, 202);
    }

    public function updatePassword(UpdatePasswordRequest $request)
    {
        $user = Auth::user();

        $user->update([
            'password' => Hash::make($request->input('password')),
        ]);

        return response()->json($user, 202);
    }
}
