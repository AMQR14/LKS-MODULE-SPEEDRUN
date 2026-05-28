<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $order = Order::with('user', 'level')->get();

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'Success',
                'orders'=> $order,
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
            'user_id'=> 'required',
            'level_id'=> 'required',
            'time'=> 'required',
            'price_payed'=> 'required',
            'status'=> 'required',
        ]);

        $order = Order::create([
            'user_id'=> $request->user_id,
            'level_id'=> $request->level_id,
            'time'=> $request->time,
            'price_payed'=> $request->price_payed,
            'status'=> $request->status,
        ]);

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'Order created',
                'order'=> $order,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Order failed to be created',
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $order = Order::find($id);

        if(!$order){
            return response()->json([
                'success'=> false,
                'message'=> 'Order not found',
            ], 404);
        }

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'Success',
                'order'=> $order,
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
        $order = Order::find($id);

        if(!$order){
            return response()->json([
                'success'=> false,
                'message'=> 'Order not found',
            ], 404);
        }

        $request->validate([
            'user_id'=> 'required',
            'level_id'=> 'required',
            'time'=> 'required',
            'price_payed'=> 'required',
            'status'=> 'required',
        ]);

        $order->update([
            'user_id'=> $request->user_id,
            'level_id'=> $request->level_id,
            'time'=> $request->time,
            'price_payed'=> $request->price_payed,
            'status'=> $request->status,
        ]);

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'Order updated',
                'order'=> $order,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Order failed to be updated',
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $order = Order::find($id);

        if(!$order){
            return response()->json([
                'success'=> false,
                'message'=> 'Order not found',
            ], 404);
        }

        $order->delete();

        try{
            return response()->json([
                'success'=> true,
                'message'=> 'Order deleted',
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Order failed to be deleted',
            ], 400);
        }
    }
}
