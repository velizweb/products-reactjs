<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">

<?php

use App\Http\Controllers\ControllerComment;
use App\Http\Controllers\ControllerProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/products', [ControllerProduct::class, 'index']);
Route::prefix('/product')->group(function () {
    Route::get('/{id}/comments', [ControllerProduct::class, 'getComments']);
    Route::get('/{id}', [ControllerProduct::class, 'edit']);
    Route::post('/store', [ControllerProduct::class, 'store']);
    Route::post('/{id}', [ControllerProduct::class, 'update']);
    Route::delete('/{id}', [ControllerProduct::class, 'destroy']);
});

Route::get('/comments', [ControllerComment::class, 'index']);
Route::prefix('/comment')->group(function () {
    Route::post('/store', [ControllerComment::class, 'store']);
    Route::delete('/{id}', [ControllerComment::class, 'destroy']);
});
