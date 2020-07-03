const express= require('express')
const router= express.Router()
const {search,suggestion}=require('../controllers/search')

router.get('/suggestion',suggestion)
router.get('/:page',search)

module.exports=router