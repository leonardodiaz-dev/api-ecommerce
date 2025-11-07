"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const usuarioRoute_1 = __importDefault(require("./routes/usuarioRoute"));
const rolRoute_1 = __importDefault(require("./routes/rolRoute"));
const categoriaRoute_1 = __importDefault(require("./routes/categoriaRoute"));
const cors_1 = __importDefault(require("cors"));
const articuloRoute_1 = __importDefault(require("./routes/articuloRoute"));
const dotenv_1 = __importDefault(require("dotenv"));
const generoRoute_1 = __importDefault(require("./routes/generoRoute"));
const subcategoriasRoute_1 = __importDefault(require("./routes/subcategoriasRoute"));
const subsubcategoriaRoute_1 = __importDefault(require("./routes/subsubcategoriaRoute"));
const colorRoute_1 = __importDefault(require("./routes/colorRoute"));
const marcaRoute_1 = __importDefault(require("./routes/marcaRoute"));
const tallaRoute_1 = __importDefault(require("./routes/tallaRoute"));
const path_1 = __importDefault(require("path"));
const proveedorRoute_1 = __importDefault(require("./routes/proveedorRoute"));
const ingresoRoute_1 = __importDefault(require("./routes/ingresoRoute"));
const varianteRoute_1 = __importDefault(require("./routes/varianteRoute"));
const departamentoRoute_1 = require("./routes/departamentoRoute");
const provinciaRoute_1 = require("./routes/provinciaRoute");
const distritoRoute_1 = require("./routes/distritoRoute");
const direccionRoute_1 = __importDefault(require("./routes/direccionRoute"));
const stripeRoute_1 = __importDefault(require("./routes/stripeRoute"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}));
app.use('/api/stripe/webhook', express_1.default.raw({ type: 'application/json' }), (req, res, next) => {
    req.rawBody = req.body;
    next();
});
app.use(express_1.default.json());
app.use("/api", stripeRoute_1.default);
app.use("/api", usuarioRoute_1.default);
app.use("/api", rolRoute_1.default);
app.use("/api", categoriaRoute_1.default);
app.use("/api", articuloRoute_1.default);
app.use("/api", generoRoute_1.default);
app.use("/api", subcategoriasRoute_1.default);
app.use("/api", subsubcategoriaRoute_1.default);
app.use("/api", colorRoute_1.default);
app.use("/api", marcaRoute_1.default);
app.use("/api", tallaRoute_1.default);
app.use("/api", proveedorRoute_1.default);
app.use("/api", ingresoRoute_1.default);
app.use("/api", varianteRoute_1.default);
app.use("/api", direccionRoute_1.default);
app.use("/api", departamentoRoute_1.departamentoRouter);
app.use("/api", provinciaRoute_1.provinciaRouter);
app.use("/api", distritoRoute_1.distritoRouter);
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../public/uploads")));
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});
//# sourceMappingURL=index.js.map