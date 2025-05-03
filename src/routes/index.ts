import { Router } from "express";
import productRoutes from "../modules/products/routes/product.route";

const routes = Router();

routes.use("/products", productRoutes);
// Add another routes

export default routes;
