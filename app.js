const express=require("express")
const app=express()
require("dotenv").config()
const {ConnectDB}=require("./config/AuthdataBase.js")
const Route=require("./routes/AuthRout.js")
const UserRoutes=require("./routes/userRoute.js")
const EmployeeRoute=require("./routes/employeeRoute.js")
const JobseekerRoute=require("./routes/JobseekerRoute.js")
const {ErrorMiddle}=require("./middlewares/errorMiddleware.js")
const cors=require("cors")

ConnectDB()


app.use(cors({
    origin:["http://localhost:5173","https://nodeproject-frontend-fw6m.vercel.app"]
}))
app.use(express.json())
app.use(express.urlencoded())



app.use("/auth",Route)
app.use("/user",UserRoutes)
app.use("/Employee",EmployeeRoute)
app.use("/jobSeeker",JobseekerRoute)


app.use(ErrorMiddle)

app.listen(process.env.port,()=>{
    console.log("server running")
})