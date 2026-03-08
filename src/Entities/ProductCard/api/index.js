import photo1 from "@shared/assets/images/product/1.jpg";
import photo2 from "@shared/assets/images/product/2.jpg";
import photo3 from "@shared/assets/images/product/3.jpg";
import photo4 from "@shared/assets/images/product/4.jpg";
import photo5 from "@shared/assets/images/product/5.jpg";
import photoT1 from "@shared/assets/images/product/TYANKAAAAAAAAA.jpg";
import photoT2 from "@shared/assets/images/product/TYANKAAAAAAAAA2.jpg";

const productCatalog = [
    {
        id: 1,
        name: "Classic Tee",
        description:
            "Essential cotton t-shirt with a relaxed fit and clean silhouette for everyday wear.",
        price: 750,
        category: "tshirts",
        type: "tshirt",
        collection: { slug: "roflopug", name: "Roflopug" },
        cardVariant: "classic",
        images: [photo1, photo2, photo3],
        availableSizes: ["XS", "S", "M", "L"],
        availableColors: ["#FFC285", "#FFFFFF", "#171819"],
    },
    {
        id: 2,
        name: "Street Drop Hoodie",
        description:
            "Heavyweight brushed hoodie with dropped shoulders and oversized shape for layered street outfits.",
        price: 1290,
        category: "hoodies",
        type: "hoodie",
        collection: { slug: "night-drip", name: "Night Drip" },
        cardVariant: "street",
        images: [photo4, photo5, photoT1],
        availableSizes: ["S", "M", "L", "XL"],
        availableColors: ["#FFFFFF", "#C9D6E8", "#8A4B2D"],
    },
    {
        id: 3,
        name: "Signature Cap",
        description:
            "Minimal six-panel cap with curved visor and stitched logo for finishing everyday looks.",
        price: 590,
        category: "accessories",
        type: "accessory",
        collection: { slug: "clean-lab", name: "Clean Lab" },
        cardVariant: "clean",
        images: [photoT2, photo3, photo1],
        availableSizes: ["One Size"],
        availableColors: ["#171819", "#FFFFFF", "#EA5B2A"],
    },
    {
        id: 4,
        name: "Oversized Tee",
        description:
            "Boxy oversized t-shirt with dropped sleeves and smooth heavyweight cotton texture.",
        price: 840,
        category: "tshirts",
        type: "tshirt",
        collection: { slug: "roflopug", name: "Roflopug" },
        cardVariant: "classic",
        images: [photo2, photo4, photo1],
        availableSizes: ["S", "M", "L", "XL"],
        availableColors: ["#FFFFFF", "#CFCFCF", "#171819"],
    },
    {
        id: 5,
        name: "Zip Hoodie",
        description:
            "Front-zip hoodie with dense fleece fabric and structured hood for colder days.",
        price: 1390,
        category: "hoodies",
        type: "hoodie",
        collection: { slug: "night-drip", name: "Night Drip" },
        cardVariant: "street",
        images: [photo5, photoT1, photo3],
        availableSizes: ["M", "L", "XL"],
        availableColors: ["#171819", "#4A4A4A", "#FFFFFF"],
    },
    {
        id: 6,
        name: "Canvas Tote",
        description:
            "Durable canvas tote bag with reinforced handles and clean printed logo detail.",
        price: 490,
        category: "accessories",
        type: "accessory",
        collection: { slug: "clean-lab", name: "Clean Lab" },
        cardVariant: "clean",
        images: [photoT2, photo1, photo4],
        availableSizes: ["One Size"],
        availableColors: ["#FFFFFF", "#EAE3D6", "#171819"],
    },
    {
        id: 7,
        name: "Graphic Tee",
        description:
            "Soft jersey tee with front print placement and balanced regular silhouette.",
        price: 910,
        category: "tshirts",
        type: "tshirt",
        collection: { slug: "roflopug", name: "Roflopug" },
        cardVariant: "classic",
        images: [photo3, photo2, photo5],
        availableSizes: ["XS", "S", "M", "L"],
        availableColors: ["#FFFFFF", "#EA5B2A", "#171819"],
    },
    {
        id: 8,
        name: "Core Hoodie",
        description:
            "Essential pullover hoodie with ribbed cuffs and soft brushed interior feel.",
        price: 1240,
        category: "hoodies",
        type: "hoodie",
        collection: { slug: "night-drip", name: "Night Drip" },
        cardVariant: "street",
        images: [photoT1, photo4, photoT2],
        availableSizes: ["S", "M", "L", "XL"],
        availableColors: ["#E9E9E9", "#171819", "#7B5B45"],
    },
    {
        id: 9,
        name: "Beanie",
        description:
            "Rib-knit beanie designed for snug fit and minimalist everyday styling.",
        price: 420,
        category: "accessories",
        type: "accessory",
        collection: { slug: "clean-lab", name: "Clean Lab" },
        cardVariant: "clean",
        images: [photo1, photoT2, photo3],
        availableSizes: ["One Size"],
        availableColors: ["#171819", "#FFFFFF", "#2E4E6D"],
    },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const toSummary = (product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    type: product.type,
    collection: product.collection,
    cardVariant: product.cardVariant,
    image: product.images[0],
});

const getProducts = async () => {
    await sleep(120);
    return productCatalog.map(toSummary);
};

const getProductById = async (id) => {
    await sleep(120);
    return productCatalog.find((product) => product.id === Number(id)) || null;
};

const getProductName = (id) => {
    const product = productCatalog.find((item) => item.id === Number(id));
    return product ? product.name : `Product ${id}`;
};

export { getProducts, getProductById, getProductName };
