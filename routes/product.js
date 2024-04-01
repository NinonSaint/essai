const express = require('express')

const auth = require('../middelware/auth')

const multer = require('../middelware/multer-config')


const router = express.Router()

const productClrl = require('../controllers/product')

router.post('/',auth,multer, productClrl.createProduct);
  
router.use('/',auth, productClrl.getAllProducts);
  
router.get('/:id',auth, productClrl.getOneProduct);

router.put('/:id',auth, multer, productClrl.getOneProduct);

router.delete('/:id',auth, productClrl.deleteProduct);

module.exports = router