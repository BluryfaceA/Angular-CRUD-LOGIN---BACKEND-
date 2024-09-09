import{Router} from 'express'
import {  deleteProduct, getProduct, getProducts, postProduct, updateProduct } from '../controllers/product';
import validateToken from './validate-token';

const router = Router();

router.get('/', validateToken ,getProducts);
router.get('/:id', getProduct);
router.delete('/:id',deleteProduct);

router.post('/',postProduct);
router.put('/:id',updateProduct);


export default router;