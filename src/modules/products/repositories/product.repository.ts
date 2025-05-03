import { db } from "../../../config/database";
import { Product } from "../models/product.model";

export class ProductRepository {
  async findAll(): Promise<Product[]> {
    const [rows] = await db.query("SELECT * FROM products");
    return rows as Product[];
  }

  async findById(id: number): Promise<Product | null> {
    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
    const products = rows as Product[];
    return products[0] || null;
  }

  async create(product: Omit<Product, "id">): Promise<number> {
    const [result]: any = await db.query(
      "INSERT INTO products (name, price) VALUES (?, ?)",
      [product.name, product.price]
    );
    return result.insertId;
  }

  async update(id: number, product: Omit<Product, "id">): Promise<void> {
    await db.query("UPDATE products SET name = ?, price = ? WHERE id = ?", [
      product.name,
      product.price,
      id,
    ]);
  }

  async delete(id: number): Promise<void> {
    await db.query("DELETE FROM products WHERE id = ?", [id]);
  }
}
