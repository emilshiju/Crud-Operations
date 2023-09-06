
const customer=require('../models/customer')

const mongoose=require('mongoose')


const admin={
    email:'emilshiju10@gmail.com',
    password:123,
}

exports.login=async(req,res)=>{
    try{
        const locals = {
            invalid: req.query.message
        };
        res.render('user-login',{locals})

    }catch(err){
        console.log(err)
    }
}

exports.postlogin=async(req,res)=>{
   
    try{
        // if(admin.email!=req.body.email){
        const customers=await customer.findOne({email: req.body.email})
        console.log(customers)
        if(customers ){
            console.log(88)
            req.session.user=req.body.email
        // res.render('user-login',{customers,title})
        // res.render('user-logout', { customers, title, loggedin: true, user: req.body.email });
         res.redirect('/user-home')
        }else{
            console.log(0)
            // req.session.user=null;
    res.redirect('/?invalid=true')
    //     title='invalid'
    
    // res.render('user-login',{title,ans:true})
      
        }
    // }else{
        
    //     res.redirect('/home')
    // }
    }catch(err){
        console.log(err)
    }
}
exports.userHome=async(req,res)=>{
    console.log(req.session.user)
    if(req.session.user){
        const customers=await customer.findOne({email: req.body.email})
        // const customers=req.session.user
        const title='succesfully registered'
        const invalid='invalid'
         res.render('user-home', { customers, title, loggedIn: true, user: req.session.user,invalid });
    }else{
        res.redirect('/')
    }

}

exports.logOut=(req,res)=>{
    if(req.session.user){
        req.session.user=null;
        // res.redirect('/true')
        res.redirect('/?message=true');
    }
}






exports.adminlogin=async(req,res)=>{
    try{
        res.render('admin')
    }catch(err){
        console.log(err)
    }
}
exports.postadminlogin=async(req,res)=>{
    try{

        if(admin.email==req.body.email&&admin.password==req.body.password){
            req.session.admin=req.body.email
            res.redirect('/home')
        }else{
            res.redirect('/admin')
        }
    }catch(err){
        console.log(err)
    }
}
exports.adminlogout=async(req,res)=>{
    try{

        req.session.admin=null;
        res.redirect('/admin')

    }catch(err){
        console.log(err)
    }
    
}




exports.signup=async(req,res)=>{
    try{
        res.render('user-signup');
    }catch(err){
        console.log(err)
    }
}

exports.postsignup=async(req,res)=>{
    try{
        console.log(req.body)

        const newCustomer = new customer({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            email: req.body.email
        });

        await newCustomer.save();
        // await req.flash('info','new customer have been aded')
        console.log('Customer saved successfully');
        res.redirect('/');

    }catch(err){
        console.log(err)
    }
}






exports.homepage= async(req,res)=>{
    req.flash('info', 'new customer has been added');
        const locals={
            title:'nodejs',
            description:'free nodejs user management system'
        }
        let customers=[];
        let perpage=12;
        let page=req.query.page||1;
        const message = req.flash('info');

        try{
            if(req.session.admin){
             customers=await customer.aggregate([{$sort:{updateAt:-1}}])
             .skip(perpage*page-perpage)
             .limit(perpage)
             .exec();

             const count=await customer.count();
             
             res.render('index', {
                locals,
                customers,
                current: page,
                pages: Math.ceil(count / perpage),
                message,
                admin:true
            });
        }else{
            res.redirect('/admin')
        }
        }catch(err){
            console.log(err,+'nohh')
        }
    
}



exports.addcustomer=async(req,res)=>{
    if(req.session.admin){
    const locals={
        title:' Add ',
        description:'free nodejs user management system'
    }
    res.render('customer/add',{locals,admin:true})
}else{
    res.redirect('/admin')
}
}


exports.postcustomer = async (req, res) => {
    try {
        const newCustomer = new customer({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            email: req.body.email
        });

        await newCustomer.save();
        await req.flash('info','new customer have been aded')
        console.log('Customer saved successfully');
        res.redirect('/home');
    } catch (error) {
        console.error('Error:', error);
        // Handle the error (e.g., send an error response to the client)
    }
};

exports.view=async(req,res)=>{
    if(req.session.admin){
    try{
        const locals={
            title:'view customer data',
            description:'free nodejs user management system'
        }
        const customers=await customer.findOne({_id:req.params.id})
        res.render('customer/view',{
            locals,
            customers,
            admin:true
        })
    }catch(err){
        consoel.log(err)
    }
}else{
    res.redirect('/admin')
}
}

exports.edit=async(req,res)=>{
    if(req.session.admin){
    try{
        const locals={
            title:'Edit customer data',
            description:'free nodejs user management system'
        }
        const customers=await customer.findOne({_id:req.params.id})
        res.render('customer/edit',{
            locals,
            customers,
            admin:true
        })
    }catch(err){
        consoel.log(err)
    }
}else{
    res.redirect('/admin')
}
}


exports.editpost=async(req,res)=>{
    try{
       console.log("am gere")
        await customer.findByIdAndUpdate(req.params.id,{
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            // tel:req.body.tel,
            email:req.body.email,
            updateAt:Date.now(),

        })
        console.log(req.body)
        // await res.redirect(`/edit/${req.params.id}`)

    }catch(err){
        console.log(err)
    }
}


exports.deletecustomer=async(req,res)=>{
    if(req.session.admin){
    try{
        req.session.user=null;
        await customer.deleteOne({_id:req.params.id})
        res.redirect("/home")
    }catch(err){
        console.log(err)
    }
}else{
    res.redirect('/admin')
}
}

exports.searchcustomer=async(req,res)=>{
    if(req.session.admin){
    try{
        const locals={
            title:'Search  customer data',
            description:'free nodejs user management system'
        }
      
        let searchTerm=req.body.searchTerm
        const searchNospecialChar=searchTerm.replace(/[^\w\s\d]/gi, '');
        const customers= await customer.find({
            $or:[
                {firstName:{$regex:new RegExp(searchNospecialChar,"i")}},
                {lastName:{$regex:new RegExp(searchNospecialChar,"i")}},
            ]
        })
        
        res.render('search',{customers,locals,admin:true})
    }catch(err){
        console.log(err)
    }
    }else{
        res.redirect('/admin')
    }
}
