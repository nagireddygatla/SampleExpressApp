var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('mycustomers', ['customer']);
var ObjectId = mongojs.ObjectId;

//Logger Middleware
// var logger = function(req,res,next){

//     console.log("This is logging");
//     next();
// }

// app.use(logger);

//View Engine

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//set static path

app.use(express.static(path.join(__dirname,'public')));

app.use(function(req,res,next){
    res.locals.errors = null;
    next();
});


app.use(expressValidator({
        errorFormatter: function(param, msg, value){
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;

        while(namespace.length){
            formParam += '[' + namespaces.shift() + ']';

        }

        return {
            param: formParam,
            msg: msg,
            value: value
        };
        }
}));

var users = [
{
    id: 1,
    first_name: "Nagi Reddy",
    last_name: "Gatla",
    email: "nagireddy.gatla@gmail.com"
},

{
    id: 2,
    first_name: "Neelima",
    last_name: "Reddy",
    email: "neel.reddy@gmail.com"
},
{
    id: 3,
    first_name: "Siva",
    last_name: "Konda",
    email: "siva.konda@gmail.com"
}
];

app.get("/",function(req,res){
    //res.json(people);
    //res.send('Hello');
    // find everything
db.customer.find(function (err, docs) {
    // docs is an array of all the documents in mycollection
    //console.log(docs);
    res.render('index',{
        title: 'Customers',
        users: docs
    });
});


   
    });



    app.post('/users/add',function(req,res){
            
            req.checkBody('first_name','First Name is Required!').notEmpty();
            req.checkBody('last_name','Last Name is Required!').notEmpty();
            req.checkBody('email','Email is Required!').notEmpty();

            var errors = req.validationErrors();
            if(errors){
                console.log('Errors');
                res.render('index',{
                    title: 'Customers',
                    users: users,
                    errors: errors
                });
            }else{
                var newUser = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email
            }
            db.customer.insert(newUser, function(err,result){
                    if(err){
                        console.log('Error');
                    }
                    res.redirect('/');

            });
            }
        }); 

        app.delete('/users/delete:id',function(req,res){
                //console.log(req.params.id);
                db.customer.remove({_id: ObjectId(req.params.id)},function(err,result){
                        if(err){
                            console.log(err);
                        }
                     res.redirect('/');

                });
        });

        app.get('/users/get:id',function(req,res){
            console.log(req.params.id);
            db.customer.find({_id: ObjectId(req.params.id)},function (err, docs) {
                // docs is an array of all the documents in mycollection
                console.log(docs);
                res.send(docs);
            });
          
                 //res.redirect('/');

        
    });


app.listen(3000,function(req,res){
console.log("Server port started on port 3000");
});