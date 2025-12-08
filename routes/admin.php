<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SizeController;
use App\Http\Controllers\SubcategoryController;
use App\Http\Controllers\SubsubcategoryController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\IsAdminAuth;
use Illuminate\Support\Facades\Route;

Route::middleware([IsAdminAuth::class])->group(function () {
    Route::patch('categories/change/{category}', [CategoryController::class, 'changeStatus']);
    Route::resource('subsubcategories', SubsubcategoryController::class);
    Route::resource('categories', CategoryController::class);
    Route::patch('subcategories/change/{subcategory}', [SubcategoryController::class, 'changeStatus']);
    Route::resource('subcategories', SubcategoryController::class);
    Route::get('suppliers/exist/{ruc}', [SupplierController::class, 'exitsSupplier']);
    Route::patch('suppliers/change/{supplier}', [SupplierController::class, 'changeStatus']);
    Route::resource('suppliers', SupplierController::class);
    Route::patch('brands/change/{brand}', [BrandController::class, 'changeStatus']);
    Route::resource('brands', BrandController::class)->except('index');
    Route::resource('sizes', SizeController::class)->except('index');
    Route::resource('roles', RoleController::class);
    Route::resource('articles', ArticleController::class)->except('show');
    Route::resource('users', UserController::class)->except('update');
});
