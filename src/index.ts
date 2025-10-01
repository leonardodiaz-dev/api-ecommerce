import express from 'express'
import morgan from 'morgan'
import usuarioRouter from './routes/usuarioRoute';
import rolRoute from './routes/rolRoute';

const app = express();

app.use(morgan('dev'));
app.use("/api", usuarioRouter);
app.use("/api",rolRoute)

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
