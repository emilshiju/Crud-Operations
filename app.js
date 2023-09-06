
require('dotenv').config();
const express=require('express')
const hbs=require('express-handlebars')
const app=express()
const path=require('path')
const flash = require('express-flash');
const methodOverride = require('method-override');
const nocache=require('nocache')
const { v4: uuidv4 } = require('uuid');
// const route=require('./server/routes/customer')

const session=require('express-session')
const connectDB=require('./server/config/db')

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, max-age=0, must-revalidate');
    next();
});
app.use(nocache())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(flash());
app.use(methodOverride('_method'));
// app.use(session({secret:"key",cookie:{maxAge:60000}}))
app.use(session({
    secret:uuidv4(),
    resave:'false',
    saveUninitialized:true
}))
// app.use('/route',route)
app.use(flash({sessionKeyName:'flashmessage'}))

app.use(express.static('public'))
connectDB((err)=>{
    console.log(err,+'not connected')
})

const hbsInstance = hbs.create({extname: 'hbs',
defaultLayout: 'layout',
layoutsDir: path.join(__dirname, 'views/layouts/'),
partialsDir: path.join(__dirname,'views/partilas/'),
runtimeOptions: {
    allowProtoPropertiesByDefault: true,
}});

app.engine('hbs', hbsInstance.engine);
app.set('view engine','hbs')
app.set('views',path.join(__dirname,'views'))


app.use('/',require('./server/routes/customer'))


app.get('*',(req,res)=>{
    res.status(404).render('404')
})
app.listen(5000)