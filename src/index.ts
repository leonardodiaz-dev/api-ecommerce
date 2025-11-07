import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan'
import usuarioRouter from './routes/usuarioRoute';
import rolRoute from './routes/rolRoute';
import categoriaRouter from './routes/categoriaRoute';
import cors from 'cors'
import articuloRouter from './routes/articuloRoute';
import dotenv from 'dotenv';
import generoRouter from './routes/generoRoute';
import subcategoriaRouter from './routes/subcategoriasRoute';
import subsubcategoriaRouter from './routes/subsubcategoriaRoute';
import colorRouter from './routes/colorRoute';
import marcaRouter from './routes/marcaRoute';
import tallaRouter from './routes/tallaRoute';
import path from 'path';
import proveedorRouter from './routes/proveedorRoute';
import ingresoRouter from './routes/ingresoRoute';
import varianteRouter from './routes/varianteRoute';
import { departamentoRouter } from './routes/departamentoRoute';
import { provinciaRouter } from './routes/provinciaRoute';
import { distritoRouter } from './routes/distritoRoute';
import direccionRouter from './routes/direccionRoute';
import stripeRoute from './routes/stripeRoute';

const app = express();

dotenv.config();
app.use(morgan('dev'));
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));

app.use('/api/stripe/webhook', 
  express.raw({ type: 'application/json' }),
  (req: Request, res: Response, next: NextFunction) => {
    req.rawBody = req.body;
    next();
  }
);

app.use(express.json());
app.use("/api",stripeRoute)
app.use("/api", usuarioRouter);
app.use("/api", rolRoute)
app.use("/api", categoriaRouter)
app.use("/api", articuloRouter)
app.use("/api", generoRouter)
app.use("/api", subcategoriaRouter)
app.use("/api", subsubcategoriaRouter)
app.use("/api", colorRouter)
app.use("/api", marcaRouter)
app.use("/api", tallaRouter)
app.use("/api", proveedorRouter)
app.use("/api", ingresoRouter)
app.use("/api", varianteRouter)
app.use("/api", direccionRouter)
app.use("/api", departamentoRouter)
app.use("/api", provinciaRouter)
app.use("/api", distritoRouter)
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
