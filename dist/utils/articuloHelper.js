"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarSlug = exports.handleImageUpload = void 0;
exports.generarCodigoArticulo = generarCodigoArticulo;
const prisma_1 = require("../lib/prisma");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function generarCodigoArticulo(marcaId) {
    const marca = await prisma_1.prisma.marca.findUnique({
        where: { idMarca: marcaId },
        select: { nombre: true }
    });
    if (!marca)
        throw new Error("Marca no encontrada");
    const ultimo = await prisma_1.prisma.articulo.findFirst({
        orderBy: { idArticulo: "desc" },
    });
    const numero = ultimo ? ultimo.idArticulo + 1 : 1;
    const marcaClean = marca.nombre
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "")
        .toUpperCase();
    const codigo = `${marcaClean}-ART${numero.toString().padStart(4, "0")}`;
    return codigo;
}
const handleImageUpload = (file, imagenActual) => {
    if (!file)
        return imagenActual;
    const nuevaRuta = `/uploads/${file.filename}`;
    if (imagenActual) {
        const rutaAntigua = path_1.default.join(__dirname, `../../public${imagenActual}`);
        fs_1.default.unlink(rutaAntigua, (err) => {
            if (err)
                console.warn("⚠️ No se pudo eliminar la imagen anterior:", err);
            else
                console.log("🗑️ Imagen anterior eliminada:", rutaAntigua);
        });
    }
    return nuevaRuta;
};
exports.handleImageUpload = handleImageUpload;
const generarSlug = (nombre) => {
    return nombre
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
};
exports.generarSlug = generarSlug;
//# sourceMappingURL=articuloHelper.js.map