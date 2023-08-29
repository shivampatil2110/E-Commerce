import express from 'express'
import { getProduct,getProductById,createProduct } from '../controllers/productController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getProduct).post(protect,admin,createProduct)
router.route('/:id').get(getProductById)

export default router