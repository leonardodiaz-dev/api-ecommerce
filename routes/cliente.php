<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\IsClienteAuth;
use Illuminate\Support\Facades\Route;

Route::middleware([IsClienteAuth::class])->group(function () {
  Route::post('stripe/create-session', [StripeController::class, 'createSession']);
  Route::patch('addresses/change/{id}', [AddressController::class, 'updateEstadoIsprincipal']);
  Route::resource('addresses', AddressController::class);
  Route::put('users', [UserController::class, 'update']);
});
