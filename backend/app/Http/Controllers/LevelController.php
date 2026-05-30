<?php

namespace App\Http\Controllers;

use App\Models\Level;
use App\Models\LevelFeature;
use Illuminate\Http\Request;

class LevelController extends Controller
{
    public function index(Request $request)
    {
        $query = Level::query();

        if($request->filled('search')){
            $search = $request->search;

            $query->where(function ($e) use ($search) {
                $e->where('name' , 'like' , "%$search%")
                ->orWhere('description' , 'like' , "%$search%");
            });
        }

        $level = $query->with('level_feature')->paginate(10);

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'Success',
                'levels'=> $level,
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
            'feature'=> 'array',
            'feature'=> 'required',
        ]);

        $level = Level::create([
            'name'=> $request->name,
            'description'=> $request->description,
            'price'=> $request->price,
        ]);

        foreach ($request->feature as $key => $value) {
            LevelFeature::create([
                'level_id'=> $level->id,
                'name'=> $value,
            ]);
        }

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'Level created',
                'level'=> $level,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Level failed to be created',
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $level = Level::with('level_feature')->find($id);

        if(!$level){
            return response()->json([
                'success'=> false,
                'message'=> 'Level not found',
            ], 404);
        }

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'Success',
                'level'=> $level,
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
        $level = Level::find($id);

        if(!$level){
            return response()->json([
                'success'=> false,
                'message'=> 'Level not found',
            ], 404);
        }

        $request->validate([
            'name'=> 'required',
            'description'=> 'required',
            'price'=> 'required',
        ]);

        $level->update([
            'name'=> $request->name,
            'description'=> $request->description,
            'price'=> $request->price,
        ]);

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'Level updated',
                'level'=> $level,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Level failed to be updated',
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $level = Level::find($id);

        if(!$level){
            return response()->json([
                'success'=> false,
                'message'=> 'Level not found',
            ], 404);
        }

        $level->delete();

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'Level deleted',
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Level failed to be deleted',
            ], 400);
        }
    }
}
