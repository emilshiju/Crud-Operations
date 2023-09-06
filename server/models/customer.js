const mongoose=require('mongoose')

const schema=mongoose.Schema;
const customerschema=new schema({
    firstName:{
        type:String,
        required:[true]
    },
    lastName:{
        type:String,
        required:[true]
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    createAt:{
        type:Date,
        default:Date.now()
    },
    updateAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model('customer',customerschema)