"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../lib/prisma");
const departamentos_json_1 = __importDefault(require("../json/departamentos.json"));
const provincias_json_1 = __importDefault(require("../json/provincias.json"));
const distritos_json_1 = __importDefault(require("../json/distritos.json"));
const provinciasArray = Object.values(provincias_json_1.default).flat();
const distritosArray = Object.values(distritos_json_1.default).flat();
async function main() {
    const depMap = new Map();
    const provMap = new Map();
    await prisma_1.prisma.distrito.deleteMany();
    await prisma_1.prisma.provincia.deleteMany();
    await prisma_1.prisma.departamento.deleteMany();
    for (const dep of departamentos_json_1.default) {
        const nuevoDep = await prisma_1.prisma.departamento.create({
            data: { nombre: dep.nombre_ubigeo },
        });
        depMap.set(dep.id_ubigeo, nuevoDep.idDepartamento);
    }
    for (const prov of provinciasArray) {
        const departamentoId = depMap.get(prov.id_padre_ubigeo);
        if (!departamentoId) {
            console.warn(`Departamento no encontrado para provincia: ${prov.nombre_ubigeo}`);
            continue;
        }
        const nuevaProv = await prisma_1.prisma.provincia.create({
            data: {
                nombre: prov.nombre_ubigeo,
                departamentoId,
            },
        });
        provMap.set(prov.id_ubigeo, nuevaProv.idProvincia);
    }
    for (const dist of distritosArray) {
        const provinciaId = provMap.get(dist.id_padre_ubigeo);
        if (!provinciaId) {
            console.warn(`Provincia no encontrada para distrito: ${dist.nombre_ubigeo}`);
            continue;
        }
        await prisma_1.prisma.distrito.create({
            data: {
                nombre: dist.nombre_ubigeo,
                provinciaId,
            },
        });
    }
    console.log("Ubigeo cargado correctamente");
}
main().catch(console.error);
//# sourceMappingURL=seedUbigeo.js.map