"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articuloSeeder = void 0;
const prisma_1 = require("../lib/prisma");
const articuloSeeder = async () => {
    await prisma_1.prisma.articulo.deleteMany();
    const marcas = await prisma_1.prisma.marca.findMany();
    const generos = await prisma_1.prisma.genero.findMany();
    const subSubcategorias = await prisma_1.prisma.subSubcategoria.findMany();
    if (marcas.length === 0 || subSubcategorias.length === 0) {
        console.log("⚠️ Debes tener al menos Marcas, Géneros y SubSubcategorias creadas.");
        return;
    }
    const getMarcaId = (nombre) => marcas.find((m) => m.nombre.toLowerCase() === nombre.toLowerCase())?.idMarca;
    const getGeneroId = (nombre) => generos.find((g) => g.nombre.toLowerCase() === nombre.toLowerCase())?.idGenero || null;
    const getSubSubCategoria = (nombre) => subSubcategorias.find(s => s.nombre.toLowerCase() === nombre.toLowerCase())?.idSubSubcategoria;
    const asignarGenero = (tipo) => {
        if (tipo === "otro")
            return null;
        const opciones = ["Hombre", "Mujer", "Niños", "Unisex"];
        const elegido = opciones[Math.floor(Math.random() * opciones.length)];
        return elegido ? getGeneroId(elegido) : null;
    };
    const articulos = [
        // 👟 Calzado
        {
            marcaId: getMarcaId("Nike"),
            generoId: asignarGenero("calzado"),
            codigo: "ART001",
            nombre: "Nike Air Zoom",
            precioVenta: 399.99,
            imagen: "nike_air_zoom.jpg",
            subSubcategoriaId: getSubSubCategoria("Zapatillas"),
        },
        {
            marcaId: getMarcaId("Adidas"),
            generoId: asignarGenero("calzado"),
            codigo: "ART002",
            nombre: "Adidas Ultraboost",
            precioVenta: 349.99,
            imagen: "adidas_ultraboost.jpg",
            subSubcategoriaId: getSubSubCategoria("Zapatillas"),
        },
        {
            marcaId: getMarcaId("Reebok"),
            generoId: asignarGenero("calzado"),
            codigo: "ART003",
            nombre: "Reebok Classic Leather",
            precioVenta: 299.99,
            imagen: "reebok_classic.jpg",
            subSubcategoriaId: getSubSubCategoria("Zapatillas"),
        },
        {
            marcaId: getMarcaId("Puma"),
            generoId: asignarGenero("calzado"),
            codigo: "ART004",
            nombre: "Puma RS-X",
            precioVenta: 329.99,
            imagen: "puma_rsx.jpg",
            subSubcategoriaId: getSubSubCategoria("Zapatillas"),
        },
        // 👕 Ropa
        {
            marcaId: getMarcaId("Under Armour"),
            generoId: asignarGenero("ropa"),
            codigo: "ART005",
            nombre: "Camiseta HeatGear",
            precioVenta: 99.90,
            imagen: "underarmour_tshirt.jpg",
            subSubcategoriaId: getSubSubCategoria("Polos"),
        },
        {
            marcaId: getMarcaId("Adidas"),
            generoId: asignarGenero("ropa"),
            codigo: "ART007",
            nombre: "Adidas Joggers",
            precioVenta: 199.90,
            imagen: "adidas_joggers.jpg",
            subSubcategoriaId: getSubSubCategoria("Pantalones"),
        },
        {
            marcaId: getMarcaId("Levi's"),
            generoId: asignarGenero("ropa"),
            codigo: "MOD001",
            nombre: "Polo Levi’s Original",
            precioVenta: 149.00,
            imagen: "levis_polo.jpg",
            subSubcategoriaId: getSubSubCategoria("Polos"),
        },
        {
            marcaId: getMarcaId("Zara"),
            generoId: asignarGenero("ropa"),
            codigo: "MOD002",
            nombre: "Vestido Zara Verano",
            precioVenta: 199.00,
            imagen: "zara_vestido.jpg",
            subSubcategoriaId: getSubSubCategoria("Vestidos"),
        },
        {
            marcaId: getMarcaId("Calvin Klein"),
            generoId: asignarGenero("ropa"),
            codigo: "MOD003",
            nombre: "Casaca Calvin Klein Denim",
            precioVenta: 399.00,
            imagen: "ck_casaca.jpg",
            subSubcategoriaId: getSubSubCategoria("Casacas"),
        },
        {
            marcaId: getMarcaId("Prada"),
            generoId: asignarGenero("calzado"),
            codigo: "MOD004",
            nombre: "Zapatos Prada Elegantes",
            precioVenta: 999.00,
            imagen: "prada_zapatos.jpg",
            subSubcategoriaId: getSubSubCategoria("Zapatos"),
        },
        {
            marcaId: getMarcaId("Gucci"),
            generoId: null,
            codigo: "MOD005",
            nombre: "Bolso Gucci Soho",
            precioVenta: 1299.00,
            imagen: "gucci_bolso.jpg",
            subSubcategoriaId: getSubSubCategoria("Bolsos"),
        },
        // 📱 Tecnología
        {
            marcaId: getMarcaId("Apple"),
            generoId: null,
            codigo: "ART008",
            nombre: "iPhone 15 Pro",
            precioVenta: 4599.99,
            imagen: "iphone15pro.jpg",
            subSubcategoriaId: getSubSubCategoria("Smartphones"),
        },
        {
            marcaId: getMarcaId("Samsung"),
            generoId: null,
            codigo: "ART009",
            nombre: "Samsung Galaxy S24",
            precioVenta: 3999.99,
            imagen: "galaxy_s24.jpg",
            subSubcategoriaId: getSubSubCategoria("Smartphones"),
        },
        {
            marcaId: getMarcaId("Sony"),
            generoId: null,
            codigo: "ART010",
            nombre: "Sony WH-1000XM5",
            precioVenta: 1299.99,
            imagen: "sony_wh1000xm5.jpg",
            subSubcategoriaId: getSubSubCategoria("Auriculares"),
        },
        {
            marcaId: getMarcaId("LG"),
            generoId: null,
            codigo: "ART011",
            nombre: "LG OLED TV 55”",
            precioVenta: 5999.99,
            imagen: "lg_oled.jpg",
            subSubcategoriaId: getSubSubCategoria("TVs entre 50 y 58"),
        },
        {
            marcaId: getMarcaId("Xiaomi"),
            generoId: null,
            codigo: "ART012",
            nombre: "Xiaomi Mi Band 8",
            precioVenta: 199.99,
            imagen: "xiaomi_band8.jpg",
            subSubcategoriaId: getSubSubCategoria("Xiaomi"),
        },
        {
            marcaId: getMarcaId("Google Pixel"),
            generoId: null,
            codigo: "TEC001",
            nombre: "Google Pixel 7",
            precioVenta: 2599.00,
            imagen: "google_pixel7.jpg",
            subSubcategoriaId: getSubSubCategoria("Smartphones"),
        },
        {
            marcaId: getMarcaId("MSI"),
            generoId: null,
            codigo: "TEC002",
            nombre: "Laptop MSI Raider Gaming",
            precioVenta: 6999.00,
            imagen: "msi_raider.jpg",
            subSubcategoriaId: getSubSubCategoria("Gaming"),
        },
        {
            marcaId: getMarcaId("Oppo"),
            generoId: null,
            codigo: "TEC003",
            nombre: "Tablet Oppo Pad Air",
            precioVenta: 899.00,
            imagen: "oppo_pad.jpg",
            subSubcategoriaId: getSubSubCategoria("Android"),
        },
        {
            marcaId: getMarcaId("Razer"),
            generoId: null,
            codigo: "TEC004",
            nombre: "Auriculares Razer Kraken",
            precioVenta: 499.00,
            imagen: "razer_kraken.jpg",
            subSubcategoriaId: getSubSubCategoria("Auriculares"),
        },
        {
            marcaId: getMarcaId("Vivo"),
            generoId: null,
            codigo: "TEC005",
            nombre: "Vivo Watch 2",
            precioVenta: 799.00,
            imagen: "vivo_watch2.jpg",
            subSubcategoriaId: getSubSubCategoria("Xiaomi"),
        },
        // 🎒 Accesorios
        {
            marcaId: getMarcaId("Nike"),
            generoId: null,
            codigo: "ART013",
            nombre: "Mochila Nike Brasilia",
            precioVenta: 159.99,
            imagen: "mochila_nike.jpg",
            subSubcategoriaId: getSubSubCategoria("Mochilas"),
        },
        // Belleza y Cuidado Personal
        {
            marcaId: getMarcaId("Maybelline"),
            generoId: null,
            codigo: "ART100",
            nombre: "Maybelline SuperStay Matte Ink",
            precioVenta: 59.90,
            imagen: "maybelline_superstay.jpg",
            subSubcategoriaId: getSubSubCategoria("Labiales"),
        },
        {
            marcaId: getMarcaId("L'Oréal Paris"),
            generoId: null,
            codigo: "ART101",
            nombre: "L'Oréal Palette de Sombras Nude",
            precioVenta: 89.90,
            imagen: "loreal_sombras.jpg",
            subSubcategoriaId: getSubSubCategoria("Sombras"),
        },
        {
            marcaId: getMarcaId("MAC Cosmetics"),
            generoId: null,
            codigo: "ART102",
            nombre: "MAC Studio Fix Fluid Foundation",
            precioVenta: 149.90,
            imagen: "mac_base.jpg",
            subSubcategoriaId: getSubSubCategoria("Bases"),
        },
        {
            marcaId: getMarcaId("CeraVe"),
            generoId: null,
            codigo: "ART103",
            nombre: "CeraVe Crema Hidratante 340g",
            precioVenta: 79.90,
            imagen: "cerave_crema.jpg",
            subSubcategoriaId: getSubSubCategoria("Cremas"),
        },
        {
            marcaId: getMarcaId("The Ordinary"),
            generoId: null,
            codigo: "ART104",
            nombre: "The Ordinary Niacinamide 10% + Zinc 1%",
            precioVenta: 119.90,
            imagen: "ordinary_serum.jpg",
            subSubcategoriaId: getSubSubCategoria("Sérums"),
        },
        {
            marcaId: getMarcaId("La Roche-Posay"),
            generoId: null,
            codigo: "ART105",
            nombre: "La Roche-Posay Anthelios SPF 50",
            precioVenta: 139.90,
            imagen: "laroche_protector.jpg",
            subSubcategoriaId: getSubSubCategoria("Protector Solar"),
        },
        {
            marcaId: getMarcaId("Chanel"),
            generoId: null,
            codigo: "ART106",
            nombre: "Chanel No. 5 Eau de Parfum 100ml",
            precioVenta: 499.90,
            imagen: "chanel_no5.jpg",
            subSubcategoriaId: getSubSubCategoria("Perfumes Mujer"),
        },
        {
            marcaId: getMarcaId("Dior"),
            generoId: null,
            codigo: "ART107",
            nombre: "Dior Sauvage Eau de Toilette 100ml",
            precioVenta: 449.90,
            imagen: "dior_sauvage.jpg",
            subSubcategoriaId: getSubSubCategoria("Perfumes Hombre"),
        },
        {
            marcaId: getMarcaId("Lancôme"),
            generoId: null,
            codigo: "ART108",
            nombre: "Lancôme La Vie Est Belle 75ml",
            precioVenta: 429.90,
            imagen: "lancome_lavie.jpg",
            subSubcategoriaId: getSubSubCategoria("Perfumes Mujer"),
        },
        {
            marcaId: getMarcaId("Estée Lauder"),
            generoId: null,
            codigo: "BEL001",
            nombre: "Base Estée Lauder Double Wear",
            precioVenta: 199.00,
            imagen: "estee_base.jpg",
            subSubcategoriaId: getSubSubCategoria("Bases"),
        },
        {
            marcaId: getMarcaId("Clinique"),
            generoId: null,
            codigo: "BEL002",
            nombre: "Perfume Clinique Happy Mujer",
            precioVenta: 349.00,
            imagen: "clinique_perfume.jpg",
            subSubcategoriaId: getSubSubCategoria("Perfumes Mujer"),
        },
        {
            marcaId: getMarcaId("Maybelline"),
            generoId: null,
            codigo: "BEL003",
            nombre: "Labial Maybelline SuperStay",
            precioVenta: 69.00,
            imagen: "maybelline_labial.jpg",
            subSubcategoriaId: getSubSubCategoria("Labiales"),
        },
        {
            marcaId: getMarcaId("Urban Decay"),
            generoId: null,
            codigo: "BEL004",
            nombre: "Sombras Urban Decay Naked",
            precioVenta: 249.00,
            imagen: "ud_naked.jpg",
            subSubcategoriaId: getSubSubCategoria("Sombras"),
        },
        {
            marcaId: getMarcaId("Shiseido"),
            generoId: null,
            codigo: "BEL005",
            nombre: "Sérum Shiseido Ultimune",
            precioVenta: 499.00,
            imagen: "shiseido_serum.jpg",
            subSubcategoriaId: getSubSubCategoria("Sérums"),
        },
    ];
    await prisma_1.prisma.articulo.createMany({
        data: articulos,
        skipDuplicates: true,
    });
    console.log("✅ Artículos insertados con coincidencia de marcas y géneros");
};
exports.articuloSeeder = articuloSeeder;
//# sourceMappingURL=seedArticulo.js.map