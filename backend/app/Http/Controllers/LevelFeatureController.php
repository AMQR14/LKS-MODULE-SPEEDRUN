<?php

namespace App\Http\Controllers;

use App\Models\LevelFeature;
use Illuminate\Http\Request;

class LevelFeatureController extends Controller
{
    public function index()
    {
        $levelFeature = LevelFeature::all();

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'Success',
                'levelFeatures'=> $levelFeature,
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
            'level_id'=> 'required',
            'name'=> 'required',
        ]);

        $levelFeature = LevelFeature::create([
            'level_id'=> $request->level_id,
            'name'=> $request->name,
        ]);

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'LevelFeature created',
                'levelFeature'=> $levelFeature,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'LevelFeature failed to be created',
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $levelFeature = LevelFeature::find($id);

        if(!$levelFeature){
            return response()->json([
                'success'=> false,
                'message'=> 'LevelFeature not found',
            ], 404);
        }

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'Success',
                'levelFeature'=> $levelFeature,
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
        $levelFeature = LevelFeature::find($id);

        if(!$levelFeature){
            return response()->json([
                'success'=> false,
                'message'=> 'LevelFeature not found',
            ], 404);
        }

        $request->validate([
            'level_id'=> 'required',
            'name'=> 'required',
        ]);

        $levelFeature->update([
            'level_id'=> $request->level_id,
            'name'=> $request->name,
        ]);

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'LevelFeature updated',
                'levelFeature'=> $levelFeature,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'LevelFeature failed to be updated',
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $levelFeature = LevelFeature::find($id);

        if(!$levelFeature){
            return response()->json([
                'success'=> false,
                'message'=> 'LevelFeature not found',
            ], 404);
        }

        $levelFeature->delete();

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'LevelFeature deleted',
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'LevelFeature failed to be deleted',
            ], 400);
        }
    }
}
