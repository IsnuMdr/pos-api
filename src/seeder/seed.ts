import dotenv from "dotenv";
import { db } from "../config/database";

dotenv.config();

async function seed() {
  const dbName = process.env.DB_NAME;

  if (!dbName) {
    throw new Error("DB_NAME environment variable is not set");
  }

  try {
    // 1. Membuat Database jika belum ada
    await db.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    console.log(`✅ Database '${dbName}' checked/created.`);

    // 2. Ganti ke database yang baru dibuat
    await db.query(`USE \`${dbName}\`;`);

    // 3. Membuat Tabel Products
    await db.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);
    console.log(`✅ Table 'products' checked/created.`);

    // 4. Insert Sample Data (optional)
    await db.query(`
      INSERT INTO products (name, price)
      VALUES 
        ('Laptop', '1200'),
        ('Smartphone', '800'),
        ('Tablet', '600')
      ON DUPLICATE KEY UPDATE name = VALUES(name), price = VALUES(price);
    `);
    console.log(`✅ Sample data inserted.`);
  } catch (error) {
    console.error("❌ Error during seeding:", (error as Error).message);
    throw error;
  }
}

seed()
  .then(() => {
    console.log("🌱 Seeding completed.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  });
