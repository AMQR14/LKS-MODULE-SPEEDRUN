<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request) {
        $request->validate([
            'username'=> 'required',
            'email'=> 'required|email',
            'password'=> 'required',
        ]);

        $user = User::create([
            'username'=> $request->username,
            'email'=> $request->email,
            'password'=> $request->password,
        ]);

        return response()->json([
            'success'=> true,
            'message'=> 'Register success',
            'data'=> $user
        ]);
    }

    public function login(Request $request) {
        if(!Auth::attempt($request->only('email', 'password'))){
            return response()->json([
                'success'=> false,
                'message'=> 'Invalid credentials',
            ], 401);
        }

        $user = Auth::user();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success'=> true,
            'message'=> 'Login success',
            'data'=> $user,
            'access_token'=> $token,
        ]);
    }

    public function users(Request $request) {
        $user = $request->user();

        return response()->json([
            'success'=> true,
            'message'=> 'Success',
            'data'=> $user,
        ]);
    }

    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success'=> true,
            'message'=> 'Logout success',
        ]);
    }
}
