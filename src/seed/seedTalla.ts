import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const tallaSeeder = async () => {
    
    await prisma.talla.deleteMany()

    await prisma.talla.createMany({
        data: [
            // Calzado
            { nombre: "5 US", tipo: "calzado" },
            { nombre: "5.5 US", tipo: "calzado" },
            { nombre: "6 US", tipo: "calzado" },
            { nombre: "6.US", tipo: "calzado" },
            { nombre: "6.5 US", tipo: "calzado" },
            { nombre: "7 US", tipo: "calzado" },
            { nombre: "7.5 US", tipo: "calzado" },
            { nombre: "8 US", tipo: "calzado" },
            { nombre: "8.5 US", tipo: "calzado" },
            { nombre: "9 US", tipo: "calzado" },
            { nombre: "9.5 US", tipo: "calzado" },
            { nombre: "10 US", tipo: "calzado" },

            // Ropa
            { nombre: "XS", tipo: "ropa" },
            { nombre: "S", tipo: "ropa" },
            { nombre: "M", tipo: "ropa" },
            { nombre: "L", tipo: "ropa" },
            { nombre: "XL", tipo: "ropa" },
            { nombre: "XXL", tipo: "ropa" },

            // Pantalones
            { nombre: "28", tipo: "ropa" },
            { nombre: "30", tipo: "ropa" },
            { nombre: "32", tipo: "ropa" },
            { nombre: "34", tipo: "ropa" },
            { nombre: "36", tipo: "ropa" },
            { nombre: "38", tipo: "ropa" },

            // Infantil
            { nombre: "2", tipo: "infantil" },
            { nombre: "4", tipo: "infantil" },
            { nombre: "6", tipo: "infantil" },
            { nombre: "8", tipo: "infantil" },
            { nombre: "10", tipo: "infantil" },
            { nombre: "12", tipo: "infantil" },
            { nombre: "14", tipo: "infantil" },
        ],
        skipDuplicates: true,
    })
}

