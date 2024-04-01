const express = require('express')

const auth = require('../middelware/auth')

const multer = require('../middelware/multer-config')

const router = express.Router()

const categoryClrl = require('../controllers/category')

router.post('/', auth,multer, categoryClrl.createCategory);
  
 
router.use('/',auth, categoryClrl.getAllCategorys);
  
  
router.get('/:id',auth, categoryClrl.getOneCategory);

router.put('/:id', auth, multer, categoryClrl.modifyCategory);

router.delete('/:id', auth, categoryClrl.deleteCategory)

   
module.exports = router