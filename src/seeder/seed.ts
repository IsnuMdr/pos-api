import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

// Ambil dari environment (Docker / Local)
const DATABASE_HOST = process.env.DB_HOST;
const DATABASE_USER = process.env.DB_USER;
const DATABASE_PASSWORD = process.env.DB_PASSWORD;
const DATABASE_NAME = process.env.DB_NAME;

async function seed() {
  const connection = await mysql.createConnection({
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
  });

  // 1. Membuat Database jika belum ada
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DATABASE_NAME}\`;`);
  console.log(`✅ Database '${DATABASE_NAME}' checked/created.`);

  // 2. Gunakan database yang sudah dibuat
  await connection.changeUser({ database: DATABASE_NAME });

  // 3. Membuat Tabel Products
  await connection.query(`
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
  await connection.query(`
    INSERT INTO products (name, price)
    VALUES 
      ('Laptop', 1200),
      ('Smartphone', 800),
      ('Tablet', 600)
    ON DUPLICATE KEY UPDATE name = VALUES(name), price = VALUES(price);
  `);
  console.log(`✅ Sample data inserted.`);

  await connection.end();
}

seed()
  .then(() => {
    console.log("🌱 Seeding completed.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  });
