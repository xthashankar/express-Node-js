let express = require('express')
let app=express();
let server=require('http').Server(app);

app.get('/',(req,res)=>{
    res.status(200).send ("hello world");
})

server.listen(3030);
