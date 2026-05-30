<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use Illuminate\Http\Request;

class StaffController extends Controller
{
    public function index(Request $request)
    {
        $query = Staff::query();

        if($request->filled('search')){
            $search = $request->search;

            $query->where(function ($e) use ($search) {
                $e->where('name', 'like', "%$search%")
                ->orWhere('email', 'like', "%$search%")
                ->orWhere('phone', 'like', "%$search%")
                ->orWhere('role', 'like', "%$search%");
            });
        }

        $staff = $query->paginate(10);

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'Success',
                'staffs'=> $staff,
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
            'name'=> 'required',
            'email'=> 'required|email',
            'phone'=> 'required',
            'role'=> 'required',
            'shift'=> 'required',
        ]);

        $staff = Staff::create([
            'name'=> $request->name,
            'email'=> $request->email,
            'phone'=> $request->phone,
            'role'=> $request->role,
            'shift'=> $request->shift,
        ]);

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'Staff created',
                'staff'=> $staff,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Staff failed to be created',
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $staff = Staff::find($id);

        if(!$staff){
            return response()->json([
                'success'=> false,
                'message'=> 'Staff not found',
            ], 404);
        }

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'Success',
                'staff'=> $staff,
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
        $staff = Staff::find($id);

        if(!$staff){
            return response()->json([
                'success'=> false,
                'message'=> 'Staff not found',
            ], 404);
        }

        $request->validate([
            'name'=> 'required',
            'email'=> 'required|email',
            'phone'=> 'required',
            'role'=> 'required',
            'shift'=> 'required',
        ]);

        $staff->update([
            'name'=> $request->name,
            'email'=> $request->email,
            'phone'=> $request->phone,
            'role'=> $request->role,
            'shift'=> $request->shift,
        ]);

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'Staff updated',
                'staff'=> $staff,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Staff failed to be updated',
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $staff = Staff::find($id);

        if(!$staff){
            return response()->json([
                'success'=> false,
                'message'=> 'Staff not found',
            ], 404);
        }

        $staff->delete();

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'Staff deleted',
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Staff failed to be deleted',
            ], 400);
        }
    }
}
