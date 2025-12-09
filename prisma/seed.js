import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Produit A",
        slug: "produit-a",
        price: 19.99,
        description: "Produit de démonstration.",
        imageUrl: "/uploads/default.jpg"
      },
      {
        name: "Produit B",
        slug: "produit-b",
        price: 29.99,
        description: "Deuxième produit.",
        imageUrl: "/uploads/default.jpg"
      }
    ]
  });
}

main()
  .then(() => console.log("Seed complet !"))
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
