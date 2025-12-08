<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreArticleRequest;
use App\Http\Resources\ArticleResource;
use App\Models\Article;
use App\Models\Brand;
use App\Models\Subcategory;
use App\Models\Subsubcategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = Article::with(['brand', 'gender', 'subsubcategory'])->get();
        return ArticleResource::collection($articles);
    }

    public function findArticles(Request $request)
    {
        try {
            $category_nombre = $request->query('categoriaNombre');
            $marcas_string = $request->query('marca');
            $generos_id = $request->query('generoId');
            $precio_min = $request->query('precioMin');
            $precio_max = $request->query('precioMax');
            $nombre = $request->query('nombre');
            $nombres_marca = $marcas_string ? explode(',', $marcas_string) : null;
            $ids_generos = $generos_id ? explode(',', $generos_id) : null;
            $query = Article::query();

            $query->where(function ($q) use ($category_nombre) {
                if ($category_nombre) {
                    $q->whereHas('subsubcategory', fn($q2) => $q2->where('nombre', $category_nombre))
                        ->orWhereHas('subsubcategory.subcategory', fn($q2) => $q2->where('nombre', $category_nombre));
                }
            });
            if ($nombre) {
                $query->where(function ($q) use ($nombre) {
                    $q->whereRaw('LOWER(nombre) LIKE ?', ['%' . strtolower($nombre) . '%'])
                        ->orWhereHas('brand', function ($q2) use ($nombre) {
                            $q2->whereRaw('LOWER(nombre) LIKE ?', ['%' . strtolower($nombre) . '%']);
                        });
                });
            }
            if ($precio_min) {
                $query->where('precioVenta', '>=', intval($precio_min));
            }
            if ($precio_max) {
                $query->where('precioVenta', '<=', intval($precio_max));
            }

            if ($nombres_marca) {
                $query->whereHas('brand', fn($q) => $q->whereIn('nombre', $nombres_marca));
            }
            if ($ids_generos) {
                $query->whereHas('gender', fn($q) => $q->whereIn('id', $ids_generos));
            }
            $articles_paginates = $query->paginate(12);

            return response()->json($articles_paginates);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al procesar la solicitud',
                'Error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreArticleRequest $request)
    {
        try {
            $data = $request->validated();

            $data['codigo'] = Article::generarCodigo();

            $data['slug'] = Article::generarSlug($data['nombre']);

            if ($request->hasFile('imagen')) {
                $data['imagen'] = $request->file('imagen')->store('articles', 'public');
            }

            $article = Article::create($data);

            $variants = json_decode($data['variants'], true);

            foreach ($variants as $item) {
                $article->variants()->create([
                    'color_id' => $item['color_id'],
                    'size_id' => $item['size_id']
                ]);
            }
            $article->load(['brand', 'gender', 'subsubcategory']);
            return (new ArticleResource($article))->response()->setStatusCode(201);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al procesar la solicitud',
                'Error' => $th->getMessage()
            ], 500);
        }
    }

    public function findResults(Request $request)
    {
        try {
            $busqueda = $request->query('q');

            $articlesQuery = Article::whereRaw('LOWER(nombre) LIKE ?', ['%' . strtolower($busqueda) . '%'])
                ->limit(5)
                ->select('id', 'nombre', 'imagen', 'precioVenta', 'slug');

            $brandsQuery  = Brand::whereRaw('LOWER(nombre) LIKE ?', ['%' . strtolower($busqueda) . '%'])
                ->limit(5)
                ->select('id', 'nombre');
            $subcategoriesQuery   = Subcategory::whereRaw('LOWER(nombre) LIKE ?', ['%' . strtolower($busqueda) . '%'])
                ->limit(5)
                ->select('id', 'nombre', 'category_id')
                ->with(['category:id,nombre']);

            $subsubcategoriesQuery = Subsubcategory::whereRaw('LOWER(nombre) LIKE ?', ['%' . strtolower($busqueda) . '%'])
                ->limit(5)
                ->select('id', 'nombre', 'subcategory_id')
                ->with(['subcategory:id,nombre']);

            $results = [
                'articulos' => $articlesQuery->get(),
                'marcas' => $brandsQuery->get(),
                'subcategorias' => $subcategoriesQuery->get(),
                'subsubcategorias' => $subsubcategoriesQuery->get()
            ];

            return response()->json([
                'query' => $busqueda,
                'resultados' => $results
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al procesar la solicitud',
                'Error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */

    public function getArticleById(Article $article)
    {
        try {
            $article->load(['subsubcategory.subcategory.category', 'variants']);
            $formattedVariants = $article->variants->map(function ($variant) {
                return [
                    'id' => $variant->id,
                    'color_id' => $variant->color_id ?? null,
                    'size_id' => $variant->size_id ?? null,
                ];
            });
            return response()->json([
                'id' => $article->id,
                'nombre' => $article->nombre,
                'precioVenta' => $article->precioVenta,
                'imagen' => $article->imagen,
                'brand_id' => $article->brand_id,
                'gender_id' => $article->gender_id,
                'category_id' => $article->subsubcategory->subcategory->category_id,
                'subcategory_id' => $article->subsubcategory->subcategory_id,
                'subsubcategory_id' => $article->subsubcategory_id,
                'variants' => $formattedVariants
            ]);
        } catch (\Throwable $th) {
              return response()->json([
                'message' => 'Error al procesar la solicitud',
                'Error' => $th->getMessage()
            ], 500);
        }
    }

    public function show($slug)
    {
        try {
            $article = Article::where('slug', $slug)
                ->with([
                    'subsubcategory.subcategory.category',
                    'brand',
                    'gender',
                    'variants' => fn($q) => $q->orderBy('id', 'asc'),
                    'variants.size',
                    'variants.color'
                ])
                ->first();

            if (!$article) {
                return response()->json(['message' => 'Artículo no encontrado'], 404);
            }

            $stockTotal = $article->variants->sum('stock');
            $tallasUnicas = $article->variants->pluck('size.nombre')->filter()->unique()->values()->toArray();
            $coloresUnicos = $article->variants->pluck('color.nombre')->filter()->unique()->values()->toArray();

            $formattedVariants = $article->variants->map(function ($variant) {
                return [
                    'id' => $variant->id,
                    'talla' => $variant->size->nombre ?? "N/A",
                    'color' => $variant->color->nombre ?? "N/A",
                    'stock' => $variant->stock
                ];
            });

            return response()->json([
                'id' => $article->id,
                'nombre' => $article->nombre,
                'slug' => $article->slug,
                'codigo' => $article->codigo,
                'precio' => (float) $article->precioVenta,
                'subcategoria' => $article->subsubcategory->subcategory,
                'subsubcategoria' => $article->subsubcategory->nombre,
                'imagen' => $article->imagen,
                'marca' => $article->brand->nombre ?? null,
                'genero' => $article->gender->nombre ?? null,
                'tallas' => $tallasUnicas,
                'colores' => $coloresUnicos,
                'stockTotal' => $stockTotal,
                'variantes' => $formattedVariants
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al procesar la solicitud',
                'Error' => $th->getMessage()
            ], 500);
        }
    }

    public function getRangoPrecio(Request $request)
    {
        try {
            $categoria = $request->query('categoria');
            $marca = $request->query('marca');


            if (!$categoria && !$marca) {
                return response()->json([
                    'message' => "Debe enviar 'categoria' o 'marca'."
                ], 400);
            }

            $query = Article::query();

            $query->where(function ($q) use ($categoria, $marca) {

                if ($marca) {
                    $q->orWhereHas('brand', function ($q2) use ($marca) {
                        $q2->whereRaw('LOWER(nombre) = ?', [strtolower($marca)]);
                    });
                }

                if ($categoria) {
                    $cat = strtolower($categoria);

                    $q->orWhereHas('subsubcategory', function ($q2) use ($cat) {
                        $q2->whereRaw('LOWER(nombre) = ?', [$cat]);
                    });

                    $q->orWhereHas('subsubcategory.subcategory', function ($q2) use ($cat) {
                        $q2->whereRaw('LOWER(nombre) = ?', [$cat]);
                    });
                }
            });

            $min = $query->clone()->min('precioVenta');
            $max = $query->clone()->max('precioVenta');

            return response()->json([
                'min' => $min ?? 0,
                'max' => $max ?? 0
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Error al obtener el rango de precios',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreArticleRequest $request, Article $article)
    {
        try {
            $data = $request->validated();

            if ($data['nombre'] !== $article->nombre) {
                $data['slug'] = Article::generarSlug($data['nombre']);
            }

            if ($request->hasFile('imagen')) {
                if ($article->imagen && Storage::disk('public')->exists($article->imagen)) {
                    Storage::disk('public')->delete($article->imagen);
                }

                $data['imagen'] = $request->file('imagen')->store('articles', 'public');
            }

            $article->update([
                'nombre'            => $data['nombre'],
                'precioVenta'       => $data['precioVenta'],
                'brand_id'          => $data['brand_id'],
                'gender_id'         => $data['gender_id'],
                'category_id'       => $data['category_id'] ?? $article->category_id,
                'subcategory_id'    => $data['subcategory_id'] ?? $article->subcategory_id,
                'subsubcategory_id' => $data['subsubcategory_id'],
                'imagen'            => $data['imagen'] ?? $article->imagen,
            ]);
            
            $variants = json_decode($data['variants'], true);
            $incoming = collect($variants)->pluck('id')->filter();
            $article->variants()
                ->whereNotIn('id', $incoming)
                ->delete();

            foreach ($variants as $item) {

                if (!empty($item['id'])) {

                    $article->variants()
                        ->where('id', $item['id'])
                        ->update([
                            'color_id' => $item['color_id'] ?? null,
                            'size_id' => $item['size_id'] ?? null
                        ]);
                } else {

                    $article->variants()->create([
                        'color_id' => $item['color_id'] ?? null,
                        'size_id' => $item['size_id'] ?? null
                    ]);
                }
            }

            $article->load(['brand', 'gender', 'subsubcategory','variants']);
            return (new ArticleResource($article))->response()->setStatusCode(200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al procesar la solicitud',
                'Error' => $th->getMessage()
            ], 500);
        }
    }

    public function changeStatus(Request $request, Article $article)
    {
        try {
            $validator = Validator::make($request->all(), [
                'estado' => 'required|boolean'
            ]);
            if ($validator->failed()) {
                return response()->json([
                    'message' => 'Datos de validación inválidos',
                    'errors' => $validator->errors()
                ], 322);
            }
            $article->update($validator->validated());
            return response()->json(['message' => 'Estado actualizado con exito']);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al procesar la solicitud',
                'Error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        //
    }
}
