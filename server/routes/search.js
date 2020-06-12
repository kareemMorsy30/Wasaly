const express= require('express')
const router= express.Router()
const {search,suggestion}=require('../controllers/search')

router.get('/',search)
router.get('/suggestion',suggestion)

module.exports=router