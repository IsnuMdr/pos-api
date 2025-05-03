import { ProductRepository } from "../repositories/product.repository";
import { Product } from "../models/product.model";

export class ProductService {
  private repository = new ProductRepository();

  async getAll(): Promise<Product[]> {
    return await this.repository.findAll();
  }

  async getById(id: number): Promise<Product | null> {
    return await this.repository.findById(id);
  }

  async create(product: Omit<Product, "id">): Promise<number> {
    return await this.repository.create(product);
  }

  async update(id: number, product: Omit<Product, "id">): Promise<void> {
    await this.repository.update(id, product);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
