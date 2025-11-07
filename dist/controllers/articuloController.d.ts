import { Request, Response } from "express";
export declare const createArticulo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getArticuloBySlug: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateArticulo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getArticuloById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const listarArticulos: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getArticulos: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateEstadoArticulo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getRangoPrecio: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=articuloController.d.ts.map