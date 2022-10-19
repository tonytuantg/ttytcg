const { json } = require('express');
var express = require('express');
var cors = require('cors');
var router = express.Router();

const getData = require('../getDataGoogleSheet');

router.get('/', function(req, res, next) {
     // if(!req.session.tenTaiKhoan){
     //      res.render('login', { title: 'Log in', layout: false } );
     // }else{
     //      res.render('home', { title: 'Trang chủ 123', user: req.session.tenTaiKhoan } );
     // }    
     res.send('hello');
     // res.send({"kq" : getData.getDataSheet('taikhoan_khoaphong','1NuydN_rCsb9X66qVct9YpowCFSVa4D0f6o8e7obAUMQ')}) ;
});	

router.post('/check_loginServer', cors(), async function(req, res, next) {
    
     var trangthai = 0;
     var tenTaiKhoan= '';
     var username = req.body.username;
     var password = req.body.password;
     var sheetId = '1NuydN_rCsb9X66qVct9YpowCFSVa4D0f6o8e7obAUMQ';
     var sheetTitle = 'taikhoan_khoaphong';
     var user = await getData.getDataSheet(sheetTitle,sheetId);
     
     for (let i = 0; i < user.length; i++) {
          if(username == user[i].USER_NAME && password == user[i].PASSWORD)
          {
               trangthai = 1;
               tenTaiKhoan = user[i].ten_hien_thi;
          }
          
     }
     var result = { 'trangthai': trangthai, 'tenTaiKhoan': tenTaiKhoan };
     // var result = { 'trangthai': '1', 'tenTaiKhoan': 'Tuan' };
     res.send(result);   
     
});

module.exports = router;
