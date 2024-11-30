const mongoose=require('mongoose')
const dotenv=require('dotenv')

dotenv.config();
connectToDb=async ()=>{
try{
    await mongoose.connect(process.env.URI);
    console.log("database connected successfully");
}catch(error){
    console.log("connection unsucessfull");
    console.error(error.message);
}
}
module.exports= {connectToDb};