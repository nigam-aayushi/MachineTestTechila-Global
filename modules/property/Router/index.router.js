import { propertyService } from "../Controller/property.controller.js";
import express from "express";
import dotenv from 'dotenv'
dotenv.config();
export const router = express.Router()
router.get('/create',propertyService.addProperty);
router.get('/readAll',propertyService.readAllProperty);
router.put('/update',propertyService.updateProperty);
router.delete('/delete',propertyService.deleteProperty);
router.get('/filter',propertyService.filter);