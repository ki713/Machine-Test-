//import all the libraries
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser  = require('cookie-parser');

//configure ENV File &Require Connnection

dotenv.config({path: './config.env'});
require('./db/conn');
const port = process.env.PORT;

//Require Model 
const Users = require('./models/usedSchema');
const { resolveSrv } = require('dns');

// These Method is used to get data and cookies from frontend
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send("Hello World");
});

app.post('/register',async(req,res)=> {
    try {
        //Get Body or data
         const name = req.body.name;
         const email = req.body.email;
         const mobile_no = req.body.mobile_no;
         const password = req.body.password;

         const createUser = new Users({
            name : name,
            email : email,
            mobile_no : mobile_no,
            password : password
         });
         //save method is used to create user 
         //but before saving or inserting, password will hash becoz of hashing,After Hash,It will save to DB
         const created = await createUser.save();
         console.log(created);  
         res.status(200).send("Registered");
    }
    catch(error)
    {
        res.status(400).send(error);
    }
})

//login user
app.post('/login',async(req,res)=>{
    try{
        const email = req.body.email;
    const password = req.body.password;

    //Find user if exist
    const user = await Users.findOne({email:email});
    if(user){
        //verify password
        const isMatch = await bcryptjs.compare(password,user.password);

        if(isMatch){
            //Generate tpken which is define in user schema
            const token = await user.generateToken();
            res.cookie("jwt",token,{
                //Expires  Token in 24 hrs
                expires : new Date(Date.now()+86400000),
                httpOnly : true
    
            })
            res.status(200).send("LoggedIN");
        }
        else{
            res.status(400).send("Inavalid Credentials")
        }
    }
    


    }
    catch(error)
    {
        res.status(400).send(error);
    }   
})

app.put('/update',async(req,res,next)=>{
    Users.findOneAndUpdate({_id:req.params.id},{
        $set:{
             name : req.body.name,
             email : req.body.email,
             mobile_no : req.body.mobile_no,
             password : req.body.password,
   
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_users : result
        })
    })

    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })

})
//Run Server
app.listen(port,()=>{
    console.log("Server run successfully");
})


