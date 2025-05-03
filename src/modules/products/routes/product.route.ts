import { Router } from "express";
import { ProductController } from "../controllers/product.controller";

const productRoutes = Router();
const controller = new ProductController();

function wrap(fn: any) {
  return (...args: any[]) => fn(...args).catch(args[2]);
}

productRoutes.get("/", controller.getAll.bind(controller));
productRoutes.get("/:id", wrap(controller.getById.bind(controller)));
productRoutes.post("/", controller.create.bind(controller));
productRoutes.put("/:id", controller.update.bind(controller));
productRoutes.delete("/:id", controller.delete.bind(controller));

export default productRoutes;
