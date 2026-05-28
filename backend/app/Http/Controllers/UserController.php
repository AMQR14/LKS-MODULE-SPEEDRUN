<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::all();

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'Success',
                'users'=> $user,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Failed',
            ], 400);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
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

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'User created',
                'user'=> $user,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'User failed to be created',
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::find($id);

        if(!$user){
            return response()->json([
                'success'=> false,
                'message'=> 'User not found',
            ], 404);
        }

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'Success',
                'user'=> $user,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Failed',
            ], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::find($id);

        if(!$user){
            return response()->json([
                'success'=> false,
                'message'=> 'User not found',
            ], 404);
        }

        $request->validate([
            'username'=> 'required',
            'email'=> 'required|email',
            'password'=> 'required',
        ]);

        $user->update([
            'username'=> $request->username,
            'email'=> $request->email,
            'password'=> $request->password,
        ]);

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'User updated',
                'user'=> $user,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'User failed to be updated',
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);

        if(!$user){
            return response()->json([
                'success'=> false,
                'message'=> 'User not found',
            ], 404);
        }

        $user->delete();

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'User deleted',
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'User failed to be deleted',
            ], 400);
        }
    }
}
