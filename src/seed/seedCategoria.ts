import { prisma } from "../lib/prisma";

export const categoriaSeeder = async () => {
  const categoriasData = [
    {
      nombre: "Tecnología",
      subcategorias: [
        {
          nombre: "Celulares",
          subsubcategorias: [
            { nombre: "Smartphones" },
            { nombre: "Gama baja" },
            { nombre: "Gama media" },
            { nombre: "Gama alta" },
            { nombre: "Accesorios" },
          ],
        },
        {
          nombre: "Televisores",
          subsubcategorias: [
            { nombre: "TVs menores a 43" },
            { nombre: "TVs entre 50 y 58" },
            { nombre: "TVs mayores de 60" },
          ],
        },
        {
          nombre: "Laptops",
          subsubcategorias: [
            { nombre: "Ultrabooks" },
            { nombre: "Gaming" },
            { nombre: "2 en 1" },
            { nombre: "Accesorios" },
          ],
        },
        {
          nombre: "Tablets",
          subsubcategorias: [
            { nombre: "Android" },
            { nombre: "iPad" },
            { nombre: "Windows" },
          ],
        },
        {
          nombre: "Accesorios de Tecnología",
          subsubcategorias: [
            { nombre: "Auriculares" },
            { nombre: "Teclados" },
            { nombre: "Mouse" },
            { nombre: "Cargadores" },
          ],
        },
        {
          nombre: "SmartWatches",
          subsubcategorias: [
            { nombre: "Apple" },
            { nombre: "Samsung" },
            { nombre: "Huawei" },
            { nombre: "Xiaomi" },
          ],
        }
      ],
    },
    {
      nombre: "Moda",
      subcategorias: [
        {
          nombre: "Hombres",
          subsubcategorias: [
            { nombre: "Polos" },
            { nombre: "Camisas" },
            { nombre: "Pantalones" },
            { nombre: "Casacas" },
            { nombre: "Zapatillas" },
          ],
        },
        {
          nombre: "Mujeres",
          subsubcategorias: [
            { nombre: "Vestidos" },
            { nombre: "Blusas" },
            { nombre: "Faldas" },
            { nombre: "Zapatos" },
            { nombre: "Bolsos" },
          ],
        },
        {
          nombre: "Niños",
          subsubcategorias: [
            { nombre: "Ropa" },
            { nombre: "Calzado" },
            { nombre: "Accesorios" },
          ],
        },
      ],
    },
    {
      nombre: "Accesorios",
      subcategorias: [
        {
          nombre: "Carteras y bolsos",
          subsubcategorias: [
            { nombre: "Carteras" },
            { nombre: "Mochilas" },
          ],
        },
        {
          nombre: "Lentes",
          subsubcategorias: [
            { nombre: "Lentes hombre" },
            { nombre: "Lentes mujer" },
          ],
        },
      ]
    },
    {
      nombre: "Hogar",
      subcategorias: [
        {
          nombre: "Electrodomésticos",
          subsubcategorias: [
            { nombre: "Refrigeradoras" },
            { nombre: "Lavadoras" },
            { nombre: "Cocinas" },
            { nombre: "Microondas" },
          ],
        },
        {
          nombre: "Muebles",
          subsubcategorias: [
            { nombre: "Sofás" },
            { nombre: "Mesas" },
            { nombre: "Camas" },
            { nombre: "Sillas" },
          ],
        },
        {
          nombre: "Decoración",
          subsubcategorias: [
            { nombre: "Cuadros" },
            { nombre: "Alfombras" },
            { nombre: "Iluminación" },
          ],
        },
      ],
    },
    {
      nombre: "Deportes",
      subcategorias: [
        {
          nombre: "Ropa Deportiva",
          subsubcategorias: [
            { nombre: "Polos" },
            { nombre: "Shorts" },
            { nombre: "Leggings" },
          ],
        },
        {
          nombre: "Equipos",
          subsubcategorias: [
            { nombre: "Balones" },
            { nombre: "Pesas" },
            { nombre: "Bicicletas" },
          ],
        },
        {
          nombre: "Calzado Deportivo",
          subsubcategorias: [
            { nombre: "Zapatillas Running" },
            { nombre: "Fútbol" },
            { nombre: "Basketball" },
          ],
        },
      ],
    },
    {
      nombre: "Belleza y Cuidado Personal",
      subcategorias: [
        {
          nombre: "Maquillaje",
          subsubcategorias: [
            { nombre: "Labiales" },
            { nombre: "Sombras" },
            { nombre: "Bases" },
          ],
        },
        {
          nombre: "Cuidado de la Piel",
          subsubcategorias: [
            { nombre: "Cremas" },
            { nombre: "Sérums" },
            { nombre: "Protector Solar" },
          ],
        },
        {
          nombre: "Perfumería",
          subsubcategorias: [
            { nombre: "Perfumes Mujer" },
            { nombre: "Perfumes Hombre" },
          ],
        },
      ],
    }
  ];

  await prisma.subSubcategoria.deleteMany()
  await prisma.subcategoria.deleteMany()
  await prisma.categoria.deleteMany()

  for (const categoria of categoriasData) {
    await prisma.categoria.create({
      data: {
        nombre: categoria.nombre,
        subcategorias: {
          create: categoria.subcategorias.map((sub) => ({
            nombre: sub.nombre,
            subsubcategorias: {
              create: sub.subsubcategorias,
            },
          })),
        },
      },
    });
  }

  console.log("✅ Seed ejecutado con éxito");
}