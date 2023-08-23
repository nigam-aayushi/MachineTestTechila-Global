import express from 'express'
import mongoose from 'mongoose';
import { router } from './modules/property/Router/index.router.js';

const app = express();
const port = process.env.PORT || 3001
app.use(express.json())
mongoose.connect(process.env.DBURL)
.then(()=>{console.log("Hello, Your app is connected to MongoDB");})
.catch(()=>{console.log("Hello, Your app is fali to connect MongoDB");})

app.use('/',router)
app.listen(port,()=>{
    console.log(`Server listen on ${port}`);
});