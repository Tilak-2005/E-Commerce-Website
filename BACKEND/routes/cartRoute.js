import express from 'express'
import { addtocart, getusercart, updatecart } from '../controllers/cartController.js'
import authUser from '../middleware/auth.js'

const cartRouter = express.Router()


cartRouter.post('/get',authUser,getusercart)
cartRouter.post('/add',authUser,addtocart)
cartRouter.post('/update',authUser,updatecart)

export default cartRouter


