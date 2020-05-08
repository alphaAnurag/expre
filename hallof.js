const express=require('express');
const path=require('path');
const port=7000;
const db=require('./Asset/configure/mongoose')
const contact=require('./model/contact');
const app=express();
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded());
app.use(express.static('Asset'));
app.use(function(req,res,next){
    console.log('middleware is called 1')
    next();
});
app.use(function(req,res,next){
    console.log('middleware is called 2')
    next();
});
var contactlist=[
    {
        name:'sohail ahmad',
        age:'22',
        sex:'male'
    },
    {
        name:'shubham pal',
        age:'22',
        sex:'male'
    },
    {
        name:'shubham ',
        age:'22',
        sex:'male'
    }
]
app.get('/profile',function(req,res){
    //  return res.render('home',{
    //         title:'Mind concentrate',
    //         contact_list:contactlist,
    //  });
     contact.find({},function(err,contactlist){
            if(err){
                console.log('error in fetching data from db');
                return;
            }
            return res.render('home',{
                title:'Mind concentrate',
                contact_list:contactlist
            });
        
        });
    
});
app.post('/create_contact',function(req,res){
    // contactlist.push(
    // {
    //     name:req.body.name,
    //     age : req.body.age,
    //     sex:req.body.sex
    // });
    contact.create({
        name:req.body.name,
        age:req.body.age,
        sex:req.body.sex
    },function(err,newContact){
        if(err){
            console.log('error in creating contact');
            return;
        }
        console.log('***',newContact);
        return res.redirect('back')
    });
    // return res.redirect('/practice');
    // console.log(req.body)
    // console.log(req.body.name)
    // console.log(req.body.age)
});
app.get('/practice',function(req,res){
    return res.render('practice',{
        title:'Mind concentrate',
        contact_list:contactlist,
    });
//     contact.find({},function(err,contactlist){
//     if(err){
//         console.log('error in fetching data from db');
//         return;
//     }
//     return res.render('practice',{
//         title:'Mind concentrate',
//         contact_list:contactlist
//     });

// });
});
app.listen(port,function(err){
    if(err){
        console.log('error occur its not working properly ')

    }
    else{
    console.log('it working properly')
    }
});
