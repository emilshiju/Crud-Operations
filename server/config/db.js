const mongoose=require('mongoose')

const connectDB=async(req,res)=>{
    try{



        const  url='mongodb://127.0.0.1:27017/projectsample';
        const con= await mongoose.connect(url,{
            useNewUrlParser: true,
         useUnifiedTopology: true
        }).then(()=>{
            console.log("connected")
        })

    }catch(err){
        console.log(err)
    }
}
module.exports=connectDB;