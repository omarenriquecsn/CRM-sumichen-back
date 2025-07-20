import { Router, Request, Response } from 'express';
import {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
} from '../controllers/productosControllers';
import { asyncHandler } from '../middlewares/asyncHandler';

const router: Router = Router();

router.get('/productos', asyncHandler(getProductos));

router.get('/productos/:id', asyncHandler(getProductoById));

router.post('/productos', asyncHandler(createProducto));

router.put('/productos/:id', asyncHandler(updateProducto));


export default router;
