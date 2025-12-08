<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'nombre' => 'required|string|max:100',
                'apellido' => 'required|string|max:100',
                'dni' => 'required|size:8',
                'telefono' => 'nullable|size:9',
                'rolesId' => 'required|array',
                'email' => 'required|string|email|min:10|max:50|unique:users,email',
                'password' => 'required|string|min:8|confirmed',
            ]);
            if ($validator->fails()) {
                return response()->json(
                    [
                        'message' => 'Datos de validacion invalidos',
                        'error' => $validator->errors()
                    ],
                    422
                );
            }
            $data = $validator->validated();
            $user = User::create([
                'nombre' => $data['nombre'],
                'apellido' => $data['apellido'],
                'dni' => $data['dni'],
                'telefono' => $data['telefono'] ?? null,
                'email' => $data['email'],
                'password' => bcrypt($data['password'])
            ]);
            $user->roles()->attach($data['rolesId']);
            return (new UserResource($user->load('roles')))->response()->setStatusCode(201);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al procesar la solicitud',
                'Error' => $th->getMessage()
            ], 500);
        }
    }
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|min:10|max:50',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $credentials = $validator->validated();

        try {

            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Invalid credentials'], 401);
            }

            $user = JWTAuth::user();

            $user->load('roles');
            $expiresIn = JWTAuth::factory()->getTTL() * 60;
            $expiresAt = now()->addSeconds($expiresIn);

            return response()->json([
                'token' => $token,
                'expires_in' => $expiresIn,
                'expires_at' => $expiresAt->toDateTimeString(),
                'user'  => new UserResource($user),
            ], 200);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Could not create token', 'detail' => $e->getMessage()], 500);
        }
    }
    public function getUser()
    {
        $user = JWTAuth::parseToken()->authenticate();
        return response()->json($user, 200);
    }
    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());
        return response()->json(['message' => 'Logged out successfully'], 200);
    }
}
