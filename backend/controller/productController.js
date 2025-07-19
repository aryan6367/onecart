import uploadOnCloudinary from "../config/cloudinary.js"
import Product from "../model/productModel.js"


export const addProduct = async (req,res) => {
    try {
        let {name,description,price,category,subCategory,sizes,bestseller} = req.body


        if (!req.files?.image1 || !req.files.image1[0]) {
            console.log('image1')
    return res.status(400).json({ message: "Image1 is required" });
}

if (!req.files?.image2 || !req.files.image2[0]) {
    console.log('image2')
    return res.status(400).json({ message: "Image2 is required" });
}

if (!req.files?.image3 || !req.files.image3[0]) {
    console.log('image3')
    return res.status(400).json({ message: "Image3 is required" });
}

if (!req.files?.image4 || !req.files.image4[0]) {
    console.log('image4')
    return res.status(400).json({ message: "Image4 is required" });
}


    const [image1, image2, image3, image4] = await Promise.all([
        uploadOnCloudinary(req.files.image1[0].path),
        uploadOnCloudinary(req.files.image2[0].path),
        uploadOnCloudinary(req.files.image3[0].path),
        uploadOnCloudinary(req.files.image4[0].path),
]);


        
        let productData = {
            name,
            description,
            price :Number(price),
            category,
            subCategory,
            sizes :JSON.parse(sizes),
            bestseller :bestseller === "true" ? true : false,
            date :Date.now(),
            image1,
            image2,
            image3,
            image4
            
        }

        console.log("hi")

        const product = await Product.create(productData)

        return res.status(201).json(product)

    } catch (error) {
          console.log("AddProduct error")
    return res.status(500).json({message:`AddProduct error ${error}`})
    }
    
}


export const listProduct = async (req,res) => {
     
    try {
        const product = await Product.find({});
        return res.status(200).json(product)

    } catch (error) {
        console.log("ListProduct error")
    return res.status(500).json({message:`ListProduct error ${error}`})
    }
}

export const removeProduct = async (req,res) => {
    try {
        let {id} = req.params;
        const product = await Product.findByIdAndDelete(id)
         return res.status(200).json(product)
    } catch (error) {
        console.log("RemoveProduct error")
    return res.status(500).json({message:`RemoveProduct error ${error}`})
    }
    
}
