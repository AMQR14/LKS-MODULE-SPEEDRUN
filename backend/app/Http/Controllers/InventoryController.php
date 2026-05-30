<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public function index(Request $request)
    {
        $query = Inventory::query();

        if($request->filled('search')){
            $search = $request->search;

            $query->where(function ($e) use ($search) {
                $e->where('name', 'like', "%$search%")
                ->orWhere('description', 'like', "%$search%")
                ->orWhereHas('room', function ($room) use ($search) {
                    $room->where('name', 'like', "%$search");
                });
            });
        }

        $inventory = $query->with('room')->paginate(10);

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'Success',
                'inventories'=> $inventory,
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
            'room_id'=> 'required',
            'name'=> 'required',
            'description'=> 'required',
            'quantity'=> 'required',
            'status'=> 'required',
        ]);

        $inventory = Inventory::create([
            'room_id'=> $request->room_id,
            'name'=> $request->name,
            'description'=> $request->description,
            'quantity'=> $request->quantity,
            'status'=> $request->status,
        ]);

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'Inventory created',
                'inventory'=> $inventory,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Inventory failed to be created',
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $inventory = Inventory::find($id);

        if(!$inventory){
            return response()->json([
                'success'=> false,
                'message'=> 'Inventory not found',
            ], 404);
        }

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'Success',
                'inventory'=> $inventory,
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
        $inventory = Inventory::find($id);

        if(!$inventory){
            return response()->json([
                'success'=> false,
                'message'=> 'Inventory not found',
            ], 404);
        }

        $request->validate([
            'room_id'=> 'required',
            'name'=> 'required',
            'description'=> 'required',
            'quantity'=> 'required',
            'status'=> 'required',
        ]);

        $inventory->update([
            'room_id'=> $request->room_id,
            'name'=> $request->name,
            'description'=> $request->description,
            'quantity'=> $request->quantity,
            'status'=> $request->status,
        ]);

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'Inventory updated',
                'inventory'=> $inventory,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Inventory failed to be updated',
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $inventory = Inventory::find($id);

        if(!$inventory){
            return response()->json([
                'success'=> false,
                'message'=> 'Inventory not found',
            ], 404);
        }

        $inventory->delete();

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'Inventory deleted',
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Inventory failed to be deleted',
            ], 400);
        }
    }
}
