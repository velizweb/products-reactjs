<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ControllerProduct extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Product::with('comments')->orderBy('created_at', 'DESC')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $newProduct = new Product();
        $newProduct->name = $request->input('name');
        $newProduct->price = $request->input('price');
        $newProduct->stock_min = $request->input('stock_min');
        $newProduct->save();

        return $newProduct;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $existingProduct = Product::find($id);

        if ($existingProduct) {
            return $existingProduct;
        }

        return response()->json(['message' => 'Product not found'], 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $existingProduct = Product::find($id);

        if ($existingProduct) {
            $existingProduct->name = $request->input('name');
            $existingProduct->price = $request->input('price');
            $existingProduct->stock_min = $request->input('stock_min');
            $existingProduct->save();

            return response()->json(['message' => 'Product update'], 201);
        }

        return response()->json(['message' => 'Product not found'], 404);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $existingProduct = Product::find($id);

        if ($existingProduct) {
            $existingProduct->delete();

            return response()->json(['message' => 'Product successfully deleted'], 201);
        }

        return response()->json(['message' => 'Product not found'], 404);
    }

    /**
     * Get product with comments
     */
    public function getComments($id)
    {
        return Product::find($id)->with('comments')->get();
    }
}
