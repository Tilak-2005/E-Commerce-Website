import {v2 as cloudinary} from "cloudinary"
import productModel from '../models/productModel.js'
import mongoose from "mongoose";
import { response } from "express";

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    const image1 = req.files?.image1?.[0] || null;
    const image2 = req.files?.image2?.[0] || null;
    const image3 = req.files?.image3?.[0] || null;
    const image4 = req.files?.image4?.[0] || null;

    const images = [image1,image2,image3,image4].filter((item) => item != undefined);

    let imagesUrl = await Promise.all(
        images.map(async (item) => {
            let result = await cloudinary.uploader.upload(item.path,{resource_type : 'image'});
            return result.secure_url;
        })
    )

    const productData = {
        name,
        description,
        price : Number(price),
        image : imagesUrl,
        category,
        subCategory,
        sizes : JSON.parse(sizes),
        bestseller: bestseller === "true" ? true : false,
        date : Date.now()
    }

    console.log(productData);

    const product = new productModel(productData);

    await product.save();

    return res.json({
      success: true,
      message: "Product Added"
    });

  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};



const listProduct = async (req,res) => {
    try {
        const products = await productModel.find({});
        res.json({success:true,products});
    } catch (error) {
        console.log(error);
    return res.json({ success: false, message: error.message });
    }
}


const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({ success: false, message: "Invalid product id" });
    }

    const deleted = await productModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}


const singleProduct = async (req, res) => {
  try {
    let { productId, id } = req.body;

    const finalId = (productId || id || "").toString().trim();

    if (!mongoose.Types.ObjectId.isValid(finalId)) {
      return res.json({ success: false, message: "Invalid product id" });
    }

    const product = await productModel.findById(finalId);

    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    return res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};




export {addProduct,listProduct,removeProduct,singleProduct}