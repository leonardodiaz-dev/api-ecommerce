import { Request, Response } from "express";
export declare const createProvedor: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateProveedor: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllProveedores: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateEstadoProveedor: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const existProveedor: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=proveedorController.d.ts.map