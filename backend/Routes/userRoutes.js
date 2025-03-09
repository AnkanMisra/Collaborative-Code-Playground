import express from 'express'
import authController from '../Controller/authController.js'

const router=express.Router()

router.route('/signUp')
.post(authController.signUp) 

export default router;