const { json } = require('express');
var express = require('express');
var cors = require('cors');
var router = express.Router();

const getData = require('../getDataGoogleSheet');
const getDataApiGgl = require('../getDataUsingGoogleApi');
var trangthai = 0;
var tenTaiKhoan = '';

router.get('/', async function(req, res, next) {
     // if(!req.session.tenTaiKhoan){
     //      res.render('login', { title: 'Log in', layout: false } );
     // }else{
     //      res.render('home', { title: 'Trang chủ 123', user: req.session.tenTaiKhoan } );
     // }    
     // res.send('hello');
     // const dateString = new Date();
     // const sheetTitle = dateString.getFullYear();
     // var sheetTitle = 'taikhoan_khoaphong';
     // const kq = '';
     // const user = await getDataApiGgl.kq(sheetTitle);
     // const soDongTrongSheet = user.data.valueRanges[0].values.length;
     // for (var i = 1; i < soDongTrongSheet; i++) {
     //      if(user.data.valueRanges[0].values[i][0] == 'khth' && user.data.valueRanges[0].values[i][2] == '123'){
     //           kq = 1;
     //      }
     // }
     res.send({"kq" : 'hello'}) ;
     // res.send({"kq" : user.data.valueRanges[0].values.length}) ;  cors(),
});	

router.get('/check_loginServer', cors(), async function(req, res, next) {
     // res.header("Access-Control-Allow-Origin", "*");
     // res.header("Access-Control-Allow-Headers", "X-Requested-With");
     // next();
     // var sheetId = '1NuydN_rCsb9X66qVct9YpowCFSVa4D0f6o8e7obAUMQ';
     var sheetTitle = 'taikhoan_khoaphong';
     const user = await getDataApiGgl.kq(sheetTitle);
     // var user = await getData.getDataSheet(sheetTitle,sheetId);
     // const soDongTrongSheet = user.data.valueRanges[0].values.length;
     // res.send({ 'trangthai': us, 'tenTaiKhoan': pw });
     // for (var i = 0; i < soDongTrongSheet; i++) {
     //      if(user.data.valueRanges[0].values[i][0] == 'khth' && user.data.valueRanges[0].values[i][2] == '123')
     //      {
     //           trangthai = 1;
     //           tenTaiKhoan = user.data.valueRanges[0].values[i][1];
               
     //      }       
         
     // }
     res.send(user.data.valueRanges[0].values); 
     // user.data.valueRanges[0].values.forEach(function (item,index){
     //      if(item[0] == toString(us) && item [2]== toString(pw))
     //      {
     //           trangthai = 1;
     //           tenTaiKhoan = item [1];
               
     //      }  
     // })
     
     // res.send({ 'trangthai': trangthai, 'tenTaiKhoan': tenTaiKhoan }); 
     // var result = { 'trangthai': trangthai, 'tenTaiKhoan': tenTaiKhoan };
     // res.send({ 'trangthai': username, 'tenTaiKhoan': password }); 
     // res.send({'kq' : trangthai});
     
});

router.post('/check_loginServer2', async function(req, res, next) {
     // res.header("Access-Control-Allow-Origin", "*");
     // res.header("Access-Control-Allow-Headers", "X-Requested-With");
     // next();
     // var sheetId = '1NuydN_rCsb9X66qVct9YpowCFSVa4D0f6o8e7obAUMQ';
     const us = req.query.user;
     const pw = req.query.pass;
     var checked = await check(us,pw);
     if(checked == 1){
          res.send('1');
     }else{
          res.send('0');
     }
     

     // user.data.valueRanges[0].values.forEach(function (item,index){
     //      if(item[0] == 'khth' && item [2] == '123')
     //      {
     //           trangthai = 1;
     //           tenTaiKhoan = item [1];               
     //      }  
     // })

     // res.send({ 'trangthai': us, 'tenTaiKhoan': pw }); 
});

async function check(us,pw){
     var sheetTitle = 'taikhoan_khoaphong';
     const user = await getDataApiGgl.kq(sheetTitle);
     const soDongTrongSheet = user.data.valueRanges[0].values.length;
     
     for (var i = 1; i <= soDongTrongSheet; i++) {
          if(user.data.valueRanges[0].values[i][0] == us && user.data.valueRanges[0].values[i][2] == pw)
          {
               // trangthai = 1;
               return 1;
               // tenTaiKhoan = user.data.valueRanges[0].values[i][1];                            
          }                
     }
     
}

module.exports = router;
