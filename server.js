const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

var app=express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');

// app.use(express.static(__dirname+'/public'));use it downside the app.use middleware where we are rendering the maintenance page
// because if we are ging to the particular help.html page then  intead of showing the maintence page it will the help.htm page
app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=`${now}:${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>{

    if(err){
      console.log('unable to append to server.log');
    }
  });


  next();
});

app.use((req,res,next)=>{

  res.render('maintenance.hbs');//instead of going to the handler it will render this page to the screen
});

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',()=>{

  return new Date().getFullYear()//instead of using this to inser in html inside res.render we will create separate function and return the value to the html
});
// helper will take the text as argument and convert it to the upper case..how to use it convert the any text in html to upper case see home page
hbs.registerHelper('screamIt',(text)=>{
return text.toUpperCase();
});
app.get('/',(req,res)=>{

  // res.send('<h1>hello express</h1>');
console.log('req');
  res.render('home.hbs',{
Welcome:'welcome to this site',
    pageTitle:'Home page',

  });
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{

    pageTitle:'about page',

  });
});

app.get('/bad',(req,res)=>{

  res.send({
    errorMessage:'unable to handle the request'
  })
});

app.get('/profile/:id',(req,res)=>{
res.send(`the profile we visit is ${req.params.id}`);

})
app.listen(3000);
