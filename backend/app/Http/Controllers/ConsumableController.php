<?php

namespace App\Http\Controllers;

use App\Models\Consumable;
use Illuminate\Http\Request;

class ConsumableController extends Controller
{
    public function index()
    {
        $consumable = Consumable::all();

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'Success',
                'consumables'=> $consumable,
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
            'price'=> 'required',
        ]);

        $consumable = Consumable::create([
            'name'=> $request->name,
            'description'=> $request->description,
            'price'=> $request->price,
        ]);

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'Consumable created',
                'consumable'=> $consumable,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Consumable failed to be created',
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $consumable = Consumable::find($id);

        if(!$consumable){
            return response()->json([
                'success'=> false,
                'message'=> 'Consumable not found',
            ], 404);
        }

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'Success',
                'consumable'=> $consumable,
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
        $consumable = Consumable::find($id);

        if(!$consumable){
            return response()->json([
                'success'=> false,
                'message'=> 'Consumable not found',
            ], 404);
        }

        $request->validate([
            'name'=> 'required',
            'description'=> 'required',
            'price'=> 'required',
        ]);

        $consumable->update([
            'name'=> $request->name,
            'description'=> $request->description,
            'price'=> $request->price,
        ]);

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'Consumable updated',
                'consumable'=> $consumable,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Consumable failed to be updated',
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $consumable = Consumable::find($id);

        if(!$consumable){
            return response()->json([
                'success'=> false,
                'message'=> 'Consumable not found',
            ], 404);
        }

        $consumable->delete();

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'Consumable deleted',
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Consumable failed to be deleted',
            ], 400);
        }
    }
}
