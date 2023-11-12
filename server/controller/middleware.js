const mongoose=require('mongoose')






exports.loggedin=(req,res,next)=>{
    if(req.session.user){
        
        res.redirect('/user-home');
        console.log(1)
    }else{
        console.log(2)
        next()
        // res.redirect('/user-home')
    }
}

exports.adminloggedin=(req,res,next)=>{
    if(req.session.admin){
        res.redirect('/home');
    }else{
        next()
    }
}

