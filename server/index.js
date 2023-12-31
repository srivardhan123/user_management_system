//whole playlist for this project!
//https://www.youtube.com/watch?v=scYojqjnHzI&list=PLJM1tXwlGdaf57oUx0rIqSW668Rpo_7oU&index=1 

//here we are creating the customer only if some user is loggedin..
//for that we use middleware while making post request in customerRoutes..before that particular request executes that
//middleware executes..(in this project) [this method is authenication middleware!]

const express  = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//configuring .env file
dotenv.config();

//set up server
const app = express();
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

//converting any json body of apis into obj form like to use in req.body..with below middleware!
app.use(express.json());

//for any request, it does cookie parsing with below middleware..so that we can use req.cookie in it!
app.use(cookieParser());

//if we dont use cors() it wont allow from localhost3000 (fronted) to localhost5001 (backend)...!
//here, if we don't use "credentials:true", the cookie will just present with in the "network->api_request->headers->here it will show in
//header's section!"
//so, we use "credentials:true", in server and frontend(need to accept cookie ) so that it will allow to store in cookie in browser..
app.use(cors({
    origin:["http://localhost:3000"],
    credentials:true,
}));

//connect to MongoDB!
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(() => {
    console.log("Connected to MongoDB...");
}).catch((err) => {
    console.log(err);
});

//setup routes!
//all the request starting with /auth + routes in userRoutes!
app.use("/auth",require("./routers/userRoutes"));
app.use("/customer",require("./routers/customerRoutes"));
