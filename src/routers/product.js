import { Router } from 'express';
import { addProductPage, createProduct, deleteProduct, getAllProducts, getProductById, updateProduct, searchProducts } from '../controllers/product.js'; 

import { checkPermission } from '../middleware/permission.js';

const router = Router();

router.get('/search', searchProducts); 
router.get('/', getAllProducts); 
router.get('/add', addProductPage); 
// Dynamic routing
router.get('/:id', getProductById); 
router.post('/', checkPermission, createProduct); 
router.put('/:id', checkPermission, updateProduct); 
router.delete('/:id', checkPermission, deleteProduct); 

export default router;