"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsearVariantes = void 0;
const parsearVariantes = (variantes) => {
    if (!variantes)
        return [];
    try {
        return JSON.parse(variantes);
    }
    catch (err) {
        console.error("Error al parsear variantes:", err);
        throw new Error("Formato de variantes inválido");
    }
};
exports.parsearVariantes = parsearVariantes;
//# sourceMappingURL=variantesHelper.js.map