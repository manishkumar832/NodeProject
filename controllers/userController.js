const {Model}=require("../models/authmodel.js")
const bcrypt=require("bcryptjs")
const {uploadCloudinary}=require("../utils/cloudinary.js")
const fs=require("fs")

const profile=async(req,res,next)=>{
   try {
    const user=await Model.findById(req.userId.id)
    res.json(user)
   } catch (error) {
 const err={StatusCode:400,err:error.message}
 next(err)
   }
}


const editProfile = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;
    let profileImageUrl;

    // ✅ Upload image only if provided
    if (req.file) {
      profileImageUrl = await uploadCloudinary(req.file.path);
      fs.unlinkSync(req.file.path);
    }

    // ✅ Build update object dynamically
    const updateData = {};
    if (name) updateData.name = name;
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) updateData.password = await bcrypt.hash(password, 12);
    if (profileImageUrl) updateData.profile = profileImageUrl;

    // ✅ Check if anything to update
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    const user = await Model.findByIdAndUpdate(req.userId.id, updateData, {
      new: true,
    });

    res.json({ message: "Profile updated", data: user });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = editProfile;



module.exports={profile,editProfile}