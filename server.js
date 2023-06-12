const express=require("express");
const app=express();
const path=require("path")
const bodyParser=require("body-parser")

const{v4:uuid4}=require("uuid");


const loginRouter=require("./routes/router")
const registerRouter=require("./routes/registerRouter")
const PORT=process.env.PORT||3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.set("view engine","ejs")

app.use('/staticCss',express.static(path.join(__dirname,"public","css")))
app.use('/staticImages',express.static(path.join(__dirname,"public")))
app.use('/staticJs',express.static(path.join(__dirname,"public","js")))


// var sessions;
app.use("/router",loginRouter);
app.use("/",loginRouter);
app.use("/",registerRouter)


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
   
})

// module.exports=sessions;