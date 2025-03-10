import express from 'express';

import dotenv from 'dotenv'; 

import router from './Routes/userRoutes.js' //The router co

import mongoose from 'mongoose'

dotenv.config({path:"./config.env"}) // Setting the config.env file


const app=express()

app.use(express.json()) //It is used to read the json file that we get from the Request

app.use('/api/v1/user',router)


export default app