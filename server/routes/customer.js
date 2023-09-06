const express=require('express')
const router=express.Router()
const customerController=require('../controller/customerController')
const middle=require('../controller/middleware')
const customer = require('../models/customer')


router.get('/',middle.loggedin,customerController.login)
router.post('/',customerController.postlogin)
router.get('/user-home',customerController.userHome)
router.get('/logOut',customerController.logOut)

router.get('/admin',middle.adminloggedin,customerController.adminlogin)
router.post('/admin',customerController.postadminlogin)
router.get('/adminlogout',customerController.adminlogout)

router.get('/logoutUser',customerController.logOut)
router.get('/signup',customerController.signup)
router.post('/signup',customerController.postsignup)
router.get('/home',customerController.homepage)
router.get('/add',customerController.addcustomer)
router.post('/add',customerController.postcustomer)

router.get('/view/:id',customerController.view)
router.get('/edit/:id',customerController.edit)
router.put('/edit/:id',customerController.editpost)
router.delete('/edit/:id',customerController.deletecustomer)

router.post('/search',customerController.searchcustomer)




module.exports=router;