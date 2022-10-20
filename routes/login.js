const { json } = require('express');
var express = require('express');
var cors = require('cors');
var router = express.Router();

const getData = require('../getDataGoogleSheet');
const getDataApiGgl = require('../getDataUsingGoogleApi');

router.get('/', async function(req, res, next) {
     // if(!req.session.tenTaiKhoan){
     //      res.render('login', { title: 'Log in', layout: false } );
     // }else{
     //      res.render('home', { title: 'Trang chủ 123', user: req.session.tenTaiKhoan } );
     // }    
     // res.send('hello');
     // const dateString = new Date();
     // const sheetTitle = dateString.getFullYear();
     var sheetTitle = 'taikhoan_khoaphong';
     const kq = '';
     const user = await getDataApiGgl.kq(sheetTitle);
     const soDongTrongSheet = user.data.valueRanges[0].values.length;
     for (var i = 1; i < soDongTrongSheet; i++) {
          if(user.data.valueRanges[0].values[i][0] == 'khth' && user.data.valueRanges[0].values[i][2] == '123'){
               kq = 1;
          }
     }
     res.send({"kq" : kq}) ;
     // res.send({"kq" : user.data.valueRanges[0].values.length}) ;
});	

router.post('/check_loginServer', cors(), async function(req, res, next) {
    
     const trangthai = 0;
     const tenTaiKhoan= '';
     const username = req.body.username;
     const password = req.body.password;
     // var sheetId = '1NuydN_rCsb9X66qVct9YpowCFSVa4D0f6o8e7obAUMQ';
     var sheetTitle = 'taikhoan_khoaphong';
     const user = await getDataApiGgl.kq(sheetTitle);
     // var user = await getData.getDataSheet(sheetTitle,sheetId);
     const soDongTrongSheet = user.data.valueRanges[0].values.length;
     for (var i = 1; i < soDongTrongSheet; i++) {
          if(toString(user.data.valueRanges[0].values[i][0]) === toString(username) && toString(user.data.valueRanges[0].values[i][2]) === toString(password))
          {
               trangthai = 1;
               tenTaiKhoan = user.data.valueRanges[0].values[i][1];
               
          }         
     }
     var result = { 'trangthai': trangthai, 'tenTaiKhoan': tenTaiKhoan };
     res.send(result); 
     // var result = { 'trangthai': '1', 'tenTaiKhoan': 'Tuan' };
     // res.send(result);   
     
});

module.exports = router;
