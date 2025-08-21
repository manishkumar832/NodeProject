const mongoose=require("mongoose")
require("dotenv").config()


async function ConnectDB(){
   try {
      await mongoose.connect(process.env.MongoDb_uri,{dbName:process.env.DBname})
      console.log("Db Connected")
   } catch (error) {
      console.log(error)
   }
}

module.exports={ConnectDB}