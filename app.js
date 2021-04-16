var express = require('express');
var app = express();

var msdata = require('./key.js');

var sql = require('mssql');
var config = {
    user: msdata.user,
    password: msdata.password,
    server: msdata.server,
    database: msdata.database,
    requestTimeout: 100000,
    port: msdata.port,
    options:{
        encrypt:false,
        enableArithAbort:true
    },
}

app.listen(1750,function(){
    console.log("start! REST API HTTP server on port 1750");
  });

  app.get('/tae/Page=:page' ,function(req,res){
    var result;
    var urlpage = req.params.page; //url의 :id를 가져온다
    sql.connect(config, err => {
        // ... error checks
       if(err){
         console.log(err);
       }else{
          //일반쿼리 사용법
         let request = new sql.Request()
         .input('page',sql.NVarChar(30),urlpage)
         .execute('SP_Get_Page',(err,result)=>{
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

  app.get('/tae1/Page=:page&Row1=:row1&Row2=:row2' ,function(req,res){
    var result;
    var urlpage = req.params.page; //url의 :id를 가져온다
    var urlrow1 = req.params.row1;
    var urlrow2 = req.params.row2;
    sql.connect(config, err => {
        // ... error checks
       if(err){
         console.log(err);
       }else{
          //일반쿼리 사용법
         let request = new sql.Request()
         .input('page',sql.NVarChar(30),urlpage)
         .input('row1',sql.NVarChar(30),urlrow1)
         .input('row2',sql.NVarChar(30),urlrow2)
         .execute('SP_Get_Row',(err,result)=>{
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
