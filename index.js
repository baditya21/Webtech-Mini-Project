var express=require('express');
var multer=require('multer');
var mongoose=require('mongoose');
var path = require('path');
var fs=require('fs');
var cors=require('cors');

const { urlencoded } = require('body-parser');
var app=express();
var Object_id=mongoose.Types.ObjectId;
app.use(cors({origin:"http://localhost:4200"}));
app.use(express.static(path.join(__dirname,'./newapp/dist/newapp')));
app.use(urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/imagedata",function(err){
    if(err){
        console.log("Not able to connect to database");
    }else{
        console.log("Database connected");
    }
})

var userdata = mongoose.model('users',{
    _id:{type:Object_id},
    username:{type:String},
    password:{type:String}
})

var imagedata = mongoose.model('images',{
    _id:{type:Object_id},
    path:{type:String},
    userid:{type:Object_id}

})


app.get('/',function(req,res){
    res.send('Connected to backend server ')
})

var filestorage=multer.diskStorage({
    destination: function(req,file,callback){
        callback(null,'./images');
    },
    filename: function(req,file,callback){
        var d=new Date();
        callback(null,d.toString().split(':').join('-').substring(0,24)+"-"+file.originalname);
    }
})

var newid="";

var upload=multer({storage:filestorage,fileFilter(req,file,callback){
    
    if(file.mimetype=='image/png'||file.mimetype=='image/jpeg'){
        var d=new Date();
        var id=new Object_id()._id;
        newid=id._id.toString();
        var user_id=req.query.userid;
        
        imagedata.insertMany([{_id:id._id.toString(),
            path:__dirname+'\\images\\'+d.toString().split(':').join('-').substring(0,24)+"-"+file.originalname,
            userid:user_id}])
        callback(null,true);
    }else{
        callback(new Error('error'),false);
    }
}}).single('file');

app.post('/add',function(req,res){

    
    upload(req,res,(err)=>{
        
        if(err){
            if(err.message=='server'){
                res.json({status:'Error',message:'Server Side Error'});
            }else if(err.message=='error'){
                res.json({status:'file',message:'File format not supported'})
            }
            
        }else{
            res.json({status:'Success',message:'Succesfully uploaded',extra:'http://localhost:3000/image/'+newid});
            newid='';
        }
    })
    
})

app.post('/delete',function(req,res){
    
        var deleteid=path.parse(req.body.link).base;
        if(Object_id.isValid(deleteid)){
            imagedata.findByIdAndDelete(deleteid,null,function(err,doc){
                if(err){
                    res.json({status:'Error',message:'Server Side Error'});
                }else{
                    fs.unlink(doc.path,function(err){
                        if(err){
                            res.json({status:'Error',message:'Server Side Error'});
                        }else{
                            res.json({status:'Success',message:'File deleted'});
                        }
                    })
                }
            })
        }else{
            res.json({status:'Invalid',message:'Invalid link'});
        }
    
})

app.post('/login',function(req,res){
    
    userdata.find({username:req.body.name,password:req.body.password},function(err,doc){
        
        if(err){
            console.log(err);
            res.json({status:"Error",message:"Server Side Error"});
        }else{
            if(doc.length==0){
                res.json({status:"Invalid",message:"Invalid username or password"});
            }else{
                res.json({status:"Success",message:"Logged in Succesfully",extra:doc[0]._id.toString()});
                
            }
        }
    })
})

app.post('/signin',function(req,res){
    userdata.find({username:req.body.name,password:req.body.password},function(err,doc){
        if(err){
            res.json({status:'Error',message:'Server Side Error'});
        }else{
            
            if(doc.length==0){
                userdata.insertMany([{_id:new Object_id()._id._id.toString(),username:req.body.name,password:req.body.password}]);
                res.json({status:'Success',message:'User registered successfully'});
            }else{
                res.json({status:'Match',message:'User already exist'});
            }
        }
    })
})

app.post('/images',function(req,res){
    
    if(Object_id.isValid(req.body.userid)){
        imagedata.find({userid:mongoose.Types.ObjectId(req.body.userid.toString())},function(err,doc){
            if(err){
                console.log(err);
                res.json({status:'Error',message:'Server Side Error'});
            }else{
                //res.json({status:'Success',message:doc});
                if(doc.length==0){
                    res.json({status:'NoData',message:'No Data Found'})
                }else{
                    res.json({status:'Success',message:'Data Found',extra:doc})
                }
            }
        })
    }else{
        res.json({status:'Invalid',message:'Invalid credentials'})
    }
})

app.get('/image/:id',function(req,res){
    if(Object_id.isValid(req.params.id)){
        imagedata.findById({_id:req.params.id},function(err,doc){
            if(err){
                res.json({status:'Error',message:'Server Side Error'});
            }else{
                res.sendFile(doc.path);
            }
        })
    }
})

app.listen(3000,function(){
    console.log('connected to server on 3000')
})