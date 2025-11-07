import { Request, Response } from "express";
export declare const createUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateAuthenticatedUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updatePassword: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const listUsuarios: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=usuarioController.d.ts.map