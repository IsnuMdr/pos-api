import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { successResponse, errorResponse } from "../../../utils/api-response";

const service = new ProductService();

export class ProductController {
  async getAll(req: Request, res: Response) {
    try {
      const products = await service.getAll();
      return res.json(successResponse(products, "Data products"));
    } catch (error) {
      return res.status(500).json(errorResponse((error as Error).message));
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const product = await service.getById(id);
      if (!product) {
        return res.status(404).json(errorResponse("Product not found", 404));
      }
      return res.json(successResponse(product, "Data product"));
    } catch (error) {
      return res.status(500).json(errorResponse((error as Error).message));
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, price } = req.body;
      const id = await service.create({ name, price });
      return res.status(201).json(successResponse({ id }, "Product created"));
    } catch (error) {
      return res.status(500).json(errorResponse((error as Error).message));
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { name, price } = req.body;

      const product = await service.getById(id);
      if (!product) {
        return res.status(400).json(errorResponse("Product not found"));
      }

      await service.update(id, { name, price });

      // get when success updated
      const productUpdated = await service.getById(id);

      return res.json(successResponse(productUpdated, "Product updated"));
    } catch (error) {
      return res.status(500).json(errorResponse((error as Error).message));
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const product = await service.getById(id);

      if (!product) {
        return res.status(400).json(errorResponse("Product not found"));
      }

      await service.delete(id);
      return res.json(successResponse(null, "Product deleted"));
    } catch (error) {
      return res.status(500).json(errorResponse((error as Error).message));
    }
  }
}
