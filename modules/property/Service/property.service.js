import { property } from "../Model/propertrySchema.Model.js";
import axios
 from "axios";
export class PropertyService{
    addPropertyService = async () =>{
        try {
            console.log("inside service")
            const options = {
                method: 'GET',
                url: 'https://realtor.p.rapidapi.com/locations/v2/auto-complete',
                params: {
                  input: 'new york',
                  limit: '100'
                },
                headers: {
                  'X-RapidAPI-Key': '0f788497e2mshf378ba9db110847p1c1214jsn7e908623e40c',
                  'X-RapidAPI-Host': 'realtor.p.rapidapi.com'
                }
              };
              
                  const response = await axios.request(options);
                  console.log("response ==", response)
                  let data = response.data.autocomplete;
                       
                data.forEach(async (element) => {
                    const propertyData = {};
                    propertyData.propertyType = element.area_type;
                    propertyData.city = element.city;
                    propertyData.country = element.country;
                    propertyData.coordinates = [element.centroid.lon ,element.centroid.lat];
                    propertyData.price = element.price?element.price:100000 + Math.floor(Math.random() * 900000);
    
                    await property.create(propertyData);
                });
                return {response : "Property Added Succesfully!!!!"}
        } catch (error) {
            return error
        }
        
    }
    readAllPropertyService = async(reqParameter) =>{
        return await property.find({isDeleted:false}).skip(((reqParameter.page || 1) - 1) * reqParameter?.limit).limit(reqParameter?.limit);
    }

    updatePropertyService = async(reqParameter) =>{
        return  await property.findByIdAndUpdate(reqParameter.id,{$set:reqParameter.data});
    }

    deletePropertyService = async(reqParameter) =>{
        return await property.findByIdAndUpdate(reqParameter.id,{$set:{isDeleted:true}});
    }

    filterService = async (reqParameter) =>{
       
        if (reqParameter.latitude && reqParameter.longitude && reqParameter.radius) {
            const query = {
                coordinates: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [parseFloat(reqParameter.longitude), parseFloat(reqParameter.latitude)],
                        },
                        $maxDistance: parseInt(reqParameter.radius),
                    },
                },
                isDeleted: false
            };

            if (reqParameter.propertyType) {
                query.propertyType = reqParameter.propertyType;
            }

            if (reqParameter.minPrice && reqParameter.maxPrice) {
                query.price = { $gte: parseInt(reqParameter.minPrice), $lte: parseInt(reqParameter.maxPrice) };
            }
            
            return await property.find(query);
        } 
        else {
            return await property.find();
        }
    }
}
