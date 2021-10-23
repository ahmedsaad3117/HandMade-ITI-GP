const product = require("../models/Product");

exports.getProducts= async (req,res)=>{
    try {
        const prod= await product.find({});
        console.log("sucsess to get data");
        return res.status(200).json(prod);
      } catch (e) {
        console.log("some thing error");
        return res.status(500).json(e.message);
      }
};
exports.getOneProduct = async (req, res) => {
  try{
      const prod = await product.findOne({_id:req.params.id});
      return res.status(200).json(prod);
    }catch(e){
      return res.status(500).json(e.message);
    }
};

exports.addProduct=async(req,res)=>{
    try{
      const {name,description,price,brand,image,richDescription, numReviews,countinStock,images,rating, isFeatured, dateCreated}=req.body
     const newname= new product({
       name,
      //  description,
      //  price,
      //  brand,
      //  image,
      //  richDescription,
      //   numReviews,
      //   countinStock,
      //   images,
      //   rating,
      //    isFeatured,
      //     dateCreated
              
            })

        const prod= await newname.save()
        if(!prod){
            throw new Error("no product to add")
        }
        return res.status(201).json(prod)
      }catch(e){
      return  res.status(500).json({error:e.message});
      }
};

exports.updateProduct= async (req,res)=>{
  
    try{
      // const {name,description,price,brand,image,richDescription, numReviews,countinStock,images,rating, isFeatured, dateCreated}=req.body

        const newname=await product.findByIdAndUpdate(req.params.id,
        req.body
        ,
          // description,
          // price,
          // brand,
          // image,
          // richDescription,
          //  numReviews,
          //  countinStock,
          //  images,rating,
          //   isFeatured,
          //    dateCreated

            
           {new:true})

        if(!newname){
           return res.status(404).send()

        }
        res.status(200).send(newname)
       
      }
      catch(e){
      return  res.status(500).json({error:e.message});
      }
};
exports.deleteProduct = async (req, res) => {
    try{
        const prod = await product.findByIdAndRemove(req.params.id);
        return res.status(200).json(prod);
      }catch(e){
        return res.status(500).json(e.message);
      }
};