const cloudinary=require("cloudinary")
require("dotenv").config()


async function uploadCloudinary(file){
    cloudinary.config({
         cloud_name:process.env.cloudinary_Cloudname,
api_key:process.env.api_keyValue,
api_secret:process.env.api_secretValue

    }) 

   try {
       
        const extension = file.split(".").pop().toLowerCase();
        let resourceType = "image"; 
        if (extension === "pdf") {
            resourceType = "raw";
        }

       
        const uploadResult = await cloudinary.v2.uploader.upload(file, {
            resource_type: resourceType
        });

        return uploadResult.secure_url;

    } catch (error) {
        console.error("Cloudinary upload failed:", error);
        throw error;
    }
}




module.exports={uploadCloudinary}