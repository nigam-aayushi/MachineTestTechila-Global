import mongoose from "mongoose";
const propertySchema = new mongoose.Schema({
  propertyType: { type: String, required: false },
  city: { type: String, required: false },
  country: { type: String, required: true },
  price:{type:String},
  coordinates: {type: [Number],
    required: true,
    index: '2dsphere', 
  },
  isDeleted: { type: Boolean, default: false }
});
export const property = mongoose.model('properties',propertySchema);