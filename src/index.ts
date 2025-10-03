import express from 'express'
import morgan from 'morgan'
import usuarioRouter from './routes/usuarioRoute';
import rolRoute from './routes/rolRoute';
import categoriaRouter from './routes/categoriaRoute';
import cors from 'cors'
import articuloRouter from './routes/articuloRoute';
import dotenv from 'dotenv';

const app = express();

dotenv.config();
app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'], 
  credentials: true 
}));
app.use(express.json());  
app.use("/api", usuarioRouter);
app.use("/api",rolRoute)
app.use("/api",categoriaRouter)
app.use("/api",articuloRouter)

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
