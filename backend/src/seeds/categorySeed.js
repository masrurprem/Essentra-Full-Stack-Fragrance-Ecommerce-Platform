import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//product category data to seed
// const categoryArray = [
//   { name: "Perfume", slug: "perfume" },
//   { name: "Men", slug: "men" },
//   { name: "Women", slug: "women" },
//   { name: "Attar", slug: "attar" },
//   { name: "GiftBox", slug: "gift-box" },
// ];

// seed function
async function main() {
  console.log("Seeding Category.....");
  // for..in takes indices
  // for..of gets the array values

  for (const cat of categoryArray) {
    await prisma.category.create({
      data: cat,
    });
    console.log(`Category created: ${cat.name} with Slug: ${cat.slug} `);
  }
  console.log("Seeding Completed.....");
}

main()
  .catch((error) => {
    console.log("seed error: ", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
