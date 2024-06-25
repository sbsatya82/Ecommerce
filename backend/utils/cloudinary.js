const cloudinary = require('cloudinary').v2;
const fs = require('fs');

require('dotenv').config({path:"backend/config/.env"});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});


const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) {
      return null;
    }

    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'products'
    });

    console.log(result);
    return result;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Remove the local file
    }
    return null;
  }
};


const deleteFromCloudiary = async(public_id)=>{
  await cloudinary.uploader.destroy(public_id);
}
module.exports = { uploadOnCloudinary , deleteFromCloudiary};
