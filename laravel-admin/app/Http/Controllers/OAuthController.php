<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;

class OAuthController extends Controller
{
    public function login(Request $request)
    {
        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();
            $token = $user->createToken('AdminAccessToken')->plainTextToken;

            $cookie = cookie('jwt', $token, 60);

            return response()->json(['message' => 'success'])->withCookie($cookie);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function register(RegisterRequest $request)
    {
        $viewer = Role::where('name', 'viewer')->first();

        if (! $viewer) {
            return response()->json([
                'message' => 'The default role is not configured.',
            ], 500);
        }

        $user = User::create($request->only('first_name', 'last_name', 'email') + [
            'password' => Hash::make($request->input('password')),
            'role_id' => $viewer->id,
        ]);

        return response()->json($user, 201);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        $cookie = Cookie::forget('jwt');

        return response()->json(['message' => 'success'])->withCookie($cookie);
    }
}
