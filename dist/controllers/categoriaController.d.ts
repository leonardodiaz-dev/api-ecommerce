import { Request, Response } from "express";
export declare const createCategoria: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateCategoria: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const listCategoriasWithSubCategorias: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateEstadoCategoria: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllCategorias: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=categoriaController.d.ts.map