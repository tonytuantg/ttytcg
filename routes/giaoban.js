var express = require('express');
var cors = require('cors');

var router = express.Router();

const getData = require('../getDataGoogleSheet');
const { json } = require('express');

router.get('/', cors(), async function(req, res, next){
     var sheetId = '1CsZFKBhVy-8OLsdDzHOkpAPEhJm1S89puOthavrSrZg';
     var sheetTitle = 'GiaoBanDem';
    

     var rows = await getData.getDataSheet(sheetTitle,sheetId);
     
     // for (let i = 0; i < user.length; i++) {
     //      if(username == user[i].USER_NAME && password == user[i].PASSWORD)
     //      {
     //           trangthai = 1;
     //           tenTaiKhoan = user[i].ten_hien_thi;
     //      }
          
     // }
     // var result = { 'trangthai': trangthai, 'tenTaiKhoan': tenTaiKhoan };
     // var result = { 'trangthai': '1', 'tenTaiKhoan': 'Tuan' };
     var khoanoi = rows[0].KhoaNoi;
     res.send(khoanoi);
})


module.exports = router;
