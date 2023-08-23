import { PropertyService } from '../Service/property.service.js';
import { radius } from '../Enums/property.enum.js';
const serviceClass = new PropertyService()
class PropertyController {
    addProperty = async (req,res)=>{
        try{
            const result = serviceClass.addPropertyService();
            res.json({ message: 'Property Added Successfully !!!!'});
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    
    readAllProperty = async (req,res)=>{
        
      try {
        const reqObject = {page: req.query.page, limit: 5}
        const response = await serviceClass.readAllPropertyService(reqObject)
        res.json({ mesage: "Data retreived Successfully!!" , Data : response});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    
    }
    
    updateProperty = async (req,res)=>{

        try{
            const reqObject ={id:req.query.id , data : req.body}
           const response = await serviceClass.updatePropertyService(reqObject)
            res.json({ message: 'Property Updated Successfully!!!' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    
    deleteProperty = async (req,res)=>{
        try{
            const reqObject = {id:req.query.id}
            const response = await serviceClass.deletePropertyService(reqObject)
            res.json({ message: 'Property Deleted Successfully!!!'});
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    
    filter =  async (req, res) => {
        try {
            const reqQuery = { 
                latitude: req.query.latitude, 
                longitude: req.query.longitude, 
                minPrice: req.query.minPrice, 
                maxPrice: req.query.maxPrice, 
                propertyType:req.query.propertyType,
                radius: radius
        }
            
            const response = await serviceClass.filterService(reqQuery)
            res.json({response})
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export const propertyService = new PropertyController();
// export let propertyController = {addProperty,readAllProperty,updateProperty,deleteProperty,filter}

