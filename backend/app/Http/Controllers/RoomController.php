<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function index(Request $request)
    {
        $query = Room::query();

        if($request->filled('search')){
            $search = $request->search;

            $query->where(function ($e) use ($search) {
                $e->where('name', 'like', "%$search%")
                ->orWhere('description', 'like', "%$search%");
            });
        }

        $room = $query->paginate(10);

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'Success',
                'rooms'=> $room,
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
            'description'=> 'required',
            'capacity'=> 'required',
            'status'=> 'required',
        ]);

        $room = Room::create([
            'name'=> $request->name,
            'description'=> $request->description,
            'capacity'=> $request->capacity,
            'status'=> $request->status,
        ]);

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'Room created',
                'room'=> $room,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Room failed to be created',
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $room = Room::find($id);

        if(!$room){
            return response()->json([
                'success'=> false,
                'message'=> 'Room not found',
            ], 404);
        }

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'Success',
                'room'=> $room,
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
        $room = Room::find($id);

        if(!$room){
            return response()->json([
                'success'=> false,
                'message'=> 'Room not found',
            ], 404);
        }

        $request->validate([
            'name'=> 'required',
            'description'=> 'required',
            'capacity'=> 'required',
            'status'=> 'required',
        ]);

        $room->update([
            'name'=> $request->name,
            'description'=> $request->description,
            'capacity'=> $request->capacity,
            'status'=> $request->status,
        ]);

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'Room updated',
                'room'=> $room,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Room failed to be updated',
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $room = Room::find($id);

        if(!$room){
            return response()->json([
                'success'=> false,
                'message'=> 'Room not found',
            ], 404);
        }

        $room->delete();

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'Room deleted',
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Room failed to be deleted',
            ], 400);
        }
    }
}
