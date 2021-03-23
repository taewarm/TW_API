var express = require('express');
var app = express();

var sql = require('mssql');
var config = {
    user: 'ID',
    password: 'PASSWARD',
    server: "데이터베이스DNS",
    database: '',
    requestTimeout: 100000,
    port: 1433,
    options:{
        encrypt:false,
        enableArithAbort:true
    },
}

app.listen(1750,function(){
    console.log("start! REST API HTTP server on port 1750");
  });

  app.get('/tae' ,function(req,res){
    var result;
    var urlpram = req.params.id; //url의 :id를 가져온다
    sql.connect(config, err => {
        // ... error checks
       if(err){
         console.log(err);
       }else{
          //일반쿼리 사용법
         let request = new sql.Request()
         request.query("select * from chang", (err, result) => {
           // ... error checks
           if(err){
             return res.json(err)
           }else{
            return res.json(result.recordset)
           }
       }) 
       } 
    });
  })
