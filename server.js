var express=require('express');
var bodyParser=require('body-parser');
var apiRouter=require('./apiRouter').router;

//Instantiate server
var server=express();

//Body Parser configuration
server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());

server.get('/',function(req,res){
  res.setHeader('Content-Type','text/html');
  res.status(200).send('<h1>Bonjour maître Stan</h1>')
});

server.use('/v2/',apiRouter);

server.listen(8000,function(){
    console.log('Serveur en marche');
})