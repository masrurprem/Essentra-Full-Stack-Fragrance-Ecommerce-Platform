import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// products to seed
// const productArray = [
//   {
//     name: "Ocean Breeze Perfume",
//     slug: "ocean-breeze-perfume",
//     description:
//       "A refreshing fragrance with aquatic, citrus, and woody notes for a clean and confident feel.",
//     shortDescription: "Fresh aquatic perfume with long-lasting fragrance.",
//     price: 800,
//     stock: 15,
//     categoryIds: [1],
//   },
//   {
//     name: "Midnight Oud Perfume",
//     slug: "midnight-oud-perfume",
//     description:
//       "A luxurious blend of oud, amber, and warm spices, perfect for evening wear.",
//     shortDescription: "Premium oud perfume with rich oriental notes.",
//     price: 2500,
//     stock: 10,
//     categoryIds: [1],
//   },

//   {
//     name: "Classic Men's Cologne",
//     slug: "classic-mens-cologne",
//     description:
//       "An elegant masculine fragrance featuring citrus, lavender, and cedarwood for everyday confidence.",
//     shortDescription: "Classic masculine scent for daily wear.",
//     price: 600,
//     stock: 20,
//     categoryIds: [1, 2],
//   },
//   {
//     name: "Bold Intense Men",
//     slug: "bold-intense-men",
//     description:
//       "A powerful fragrance with spicy pepper, leather, and smoky woods for a bold impression.",
//     shortDescription: "Bold woody fragrance for confident men.",
//     price: 1200,
//     stock: 12,
//     categoryIds: [2],
//   },

//   {
//     name: "Rose Bloom",
//     slug: "rose-bloom",
//     description:
//       "A graceful floral fragrance combining fresh rose, jasmine, and soft musk for an elegant everyday scent.",
//     shortDescription: "Elegant floral perfume with rose and jasmine.",
//     price: 700,
//     stock: 18,
//     categoryIds: [3],
//   },
//   {
//     name: "Velvet Blossom",
//     slug: "velvet-blossom",
//     description:
//       "A charming blend of peony, vanilla, and white musk, creating a soft and feminine fragrance.",
//     shortDescription: "Sweet floral fragrance with warm vanilla.",
//     price: 2100,
//     stock: 5,
//     categoryIds: [3],
//   },

//   {
//     name: "White Musk Attar",
//     slug: "white-musk-attar",
//     description:
//       "A premium alcohol-free attar with smooth white musk and delicate floral accords that last all day.",
//     shortDescription: "Soft, long-lasting white musk attar.",
//     price: 750,
//     stock: 25,
//     categoryIds: [4],
//   },
//   {
//     name: "Oudh Al Sultan Attar",
//     slug: "oudh-al-sultan-attar",
//     description:
//       "A luxurious alcohol-free attar featuring rich oud, amber, and woody notes for a sophisticated aroma.",
//     shortDescription: "Premium oud attar with lasting aroma.",
//     price: 950,
//     stock: 15,
//     categoryIds: [4],
//   },

//   {
//     name: "Luxury Velvet Gift Box",
//     slug: "luxury-velvet-gift-box",
//     description:
//       "An elegant velvet-finished gift box designed to beautifully present perfumes and attars on special occasions.",
//     shortDescription: "Premium velvet gift box for fragrances.",
//     price: 2350,
//     stock: 30,
//     categoryIds: [5],
//   },
//   {
//     name: "Classic Black Gift Box",
//     slug: "classic-black-gift-box",
//     description:
//       "A stylish black gift box with a premium finish, perfect for gifting a perfume or attar.",
//     shortDescription: "Elegant black gift box for premium gifting.",
//     price: 1250,
//     stock: 50,
//     categoryIds: [5],
//   },
// ];
// seed function

//
async function seedProduct() {
  console.log("Seeding Products.....");
  for (const prod of productArray) {
    const { categoryIds, ...prodObj } = prod;

    await prisma.product.create({
      data: {
        ...prodObj,
        categories: {
          create: prod.categoryIds.map((id) => {
            return {
              category: { connect: { id } },
            };
          }),
        },
      },
    });
    console.log(`Product ${prod.name} Created with slug ${prod.slug}`);
  }

  console.log("Seeding Completed.....");
}

seedProduct()
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

///////////////////////////////////////////////////////////////////////////////
