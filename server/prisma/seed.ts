import "dotenv/config";
import bcrypt from "bcryptjs";
import prisma from "../src/config/prisma";

async function main() {
  console.log("Starting TransitOps seed...");

  const roleNames = [
    "FLEET_MANAGER",
    "DISPATCHER",
    "SAFETY_OFFICER",
    "FINANCIAL_ANALYST",
  ];

  for (const roleName of roleNames) {
    await prisma.role.upsert({
      where: {
        roleName,
      },
      update: {},
      create: {
        roleName,
      },
    });
  }

  console.log("Roles seeded successfully");

  const passwordHash = await bcrypt.hash("password123", 10);

  const users = [
    {
      name: "Fleet Manager",
      email: "fleet@transitops.com",
      role: "FLEET_MANAGER",
    },
    {
      name: "Dispatcher",
      email: "dispatcher@transitops.com",
      role: "DISPATCHER",
    },
    {
      name: "Safety Officer",
      email: "safety@transitops.com",
      role: "SAFETY_OFFICER",
    },
    {
      name: "Financial Analyst",
      email: "finance@transitops.com",
      role: "FINANCIAL_ANALYST",
    },
  ];

  for (const user of users) {
    const role = await prisma.role.findUniqueOrThrow({
      where: {
        roleName: user.role,
      },
    });

    await prisma.user.upsert({
      where: {
        email: user.email,
      },
      update: {
        name: user.name,
        passwordHash,
        roleId: role.id,
        isActive: true,
      },
      create: {
        name: user.name,
        email: user.email,
        passwordHash,
        roleId: role.id,
        isActive: true,
      },
    });

    console.log(`Seeded user: ${user.email}`);
  }

  console.log("TransitOps seed completed successfully");
}

main()
  .catch((error) => {
    console.error("Seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });