<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ColorController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\GenderController;
use App\Http\Controllers\ProvinceController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SaleDetailController;
use App\Http\Controllers\SizeController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\SubcategoryController;
use App\Http\Controllers\SubsubcategoryController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VariantController;
use App\Http\Middleware\IsAdminAuth;
use App\Models\Article;
use App\Models\Province;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
  return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
  Route::post('stripe/webhook', [StripeController::class, 'webhook']);
  Route::resource('departments', DepartmentController::class);
  Route::get('articles/show/{article}', [ArticleController::class, 'getArticleById']);
  Route::get('articles/find', [ArticleController::class, 'findArticles']);
  Route::get('articles/price', [ArticleController::class, 'getRangoPrecio']);
  Route::get('articles/busqueda', [ArticleController::class, 'findResults']);
  Route::get('articles/slug/{slug}', [ArticleController::class, 'show']);
  Route::get('provinces/find/{id}', [ProvinceController::class, 'getProvincesByDepartment']);
  Route::get('districts/find/{id}', [DistrictController::class, 'getDistrictsByProvince']);
  Route::get('brands/find-byArticle/{nombre}', [BrandController::class, 'getMarcasByArticle']);
  Route::get('genders/find', [GenderController::class, 'findGenders']);
  Route::resource('purchases', PurchaseController::class);
  Route::get('variants/find', [VariantController::class, 'findVariant']);
  Route::get('brands/find/{category}', [BrandController::class, 'getMarcasByCategoria']);
  Route::resource('brands', BrandController::class)->only('index');
  Route::resource('colors', ColorController::class);
  Route::resource('sizes', SizeController::class)->only('index');
  Route::get('categories/hierarchy', [CategoryController::class, 'getAllCategoriesWithHierarchy']);
  Route::get('subsubcategories/brand/{brand}', [SubsubcategoryController::class, 'getSubsubcategoriesByBrand']);
  Route::get('subcategories/category/{id}', [SubcategoryController::class, 'getSubcategoriesByCategoryId']);
  Route::get('subsubcategories/subcategory/{id}', [SubsubcategoryController::class, 'getSubsubcategoriesBySubcategoryId']);
  Route::get('subsubcategories/find/{subcategory}', [SubsubcategoryController::class, 'getSubsubcategoriesBySubcategory']);
  Route::patch('subsubcategories/change/{subsubcategory}', [SubsubcategoryController::class, 'changeStatus']);
  Route::resource('genders', GenderController::class);

  require base_path('routes/auth.php');
  require base_path('routes/admin.php');
  require base_path('routes/cliente.php');
});
