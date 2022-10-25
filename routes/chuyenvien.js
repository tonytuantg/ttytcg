var express = require('express');
// const reader = require('xlsx');
const cors = require('cors');

var router = express.Router();

const getDataSheet = require('../getDataGoogleSheet');
const addDataSheet = require('../addDataGoogleSheet');

const getDataGoogleSheetAip = require('../getDataUsingGoogleApi');

router.get('/getSoCvCuoi',cors(), async function(req, res, next){
     const dateString = new Date();

     // const sheetId = '1NuydN_rCsb9X66qVct9YpowCFSVa4D0f6o8e7obAUMQ';
     const sheetTitle = dateString.getFullYear();
     // const sheetTitle = 'soCV';
     // const data = await getDataSheet.getDataSheet(sheetTitle,sheetId);

     // var lastIndex = data.length;
     // var result = {'soChuyenCuoi': data[lastIndex - 1].So_chuyen};
     // res.send(result);

     
     const chua_co_CV = await getDataGoogleSheetAip.kq(sheetTitle);
     const soDongTrongSheet = chua_co_CV.data.valueRanges[0].values.length;
     if(soDongTrongSheet == 1){
          res.send({'kq' : 1});
     }else{
          res.send({'kq' : parseInt(chua_co_CV.data.valueRanges[0].values[soDongTrongSheet-1][0]) + 1});
     }
     // res.send(chua_co_CV.data.valueRanges[0].values.length);
})

router.get('/checkdacocvchua', async function(req, res, next){
     const dateString = new Date();
     const sheetTitle = dateString.getFullYear();
     const kq = await getDataGoogleSheetAip.kq('2023');
     if(kq.data.valueRanges[0].values.length == 1){
          res.send('Chua co chuyen vien');
     }else{
          res.send('Đã co chuyen vien');
     }
     
})

router.post('/lichsuCV', cors(), async function(req, res, next){
     const sheetId = '1NuydN_rCsb9X66qVct9YpowCFSVa4D0f6o8e7obAUMQ';
     const sheetTitle = req.body.sheetTitle;
     // const data = await getDataSheet.getDataSheet(sheetTitle,sheetId);
     const data = await getDataGoogleSheetAip.kq(sheetTitle);
     
     res.send(data.data.valueRanges[0].values);
})

router.post('/themMoiCV', cors(), async function(req, res, next){
     const dateString = new Date();

     const sheetId = '1NuydN_rCsb9X66qVct9YpowCFSVa4D0f6o8e7obAUMQ';
     const sheetTitle = dateString.getFullYear();

     const soChuyen = req.body.soChuyen;
     const hoTen = req.body.tenBN;
     const gioiTinh = req.body.gioiTinh;
     const namSinh = req.body.namSinh;
     const tinh = req.body.tinh;
     const huyen = req.body.huyen;
     const xa = req.body.xa;
     const thonAp = req.body.thonAp;
     const benhChuyen = req.body.chuanDoan;
     const BVchuyenden = req.body.BVchuyenDen;
     const ngayC = req.body.ngayC;
     const thangC = req.body.thangC;
     const namC = req.body.namC;
     const BS_C = req.body.BSchuyen;
     const baohiem = req.body.baohiem;
     const noiNgoaiTru = req.body.noiNgoaiTru;

     await addDataSheet.addDataSheet(
          sheetTitle,sheetId,soChuyen,hoTen,gioiTinh,namSinh,tinh,huyen,xa,thonAp,benhChuyen,BVchuyenden,ngayC,thangC,namC,BS_C,baohiem,noiNgoaiTru
     )

     res.send({'thongBao':'Thêm thành công'});
})

router.post('/getRowsIf', cors(), async function(req, res, next){
     const ngay = req.body.ngay;
     const thang = req.body.thang;
     const nam = req.body.nam;

     const data = await getDataGoogleSheetAip.kq(nam);
     const arrData = [];
     const arrIndexRows = [];
     for (let index = 1; index < data.data.valueRanges[1].values.length; index++) {
          if(data.data.valueRanges[1].values[index][10] == ngay && 
               data.data.valueRanges[1].values[index][11] == thang && 
                    data.data.valueRanges[1].values[index][12] == nam)
          {
               arrData.push(data.data.valueRanges[1].values[index],index);          
               arrIndexRows.push(index);
          }
          
     }
     // res.send(data.data.valueRanges[1].values);
     res.send(arrData);
})

router.post('/updateRow', async function(req, res, next){

     const soChuyen = req.body.soChuyen;
     const rowIndex = parseInt(req.body.rowIndex) + 1;
     const tenBN = req.body.tenBN;
     const gioiTinh = req.body.gioiTinh;
     const namSinh = req.body.namSinh;
     const tinh = req.body.tinh;
     const huyen = req.body.huyen;
     const xa = req.body.xa;
     const thonAp = req.body.thonAp;
     const chuanDoan = req.body.chuanDoan;
     const BVchuyenDen = req.body.BVchuyenDen;
     const ngayC = req.body.ngayC;
     const thangC =  req.body.thangC;
     const namC = req.body.namC;
     const BSchuyen = req.body.BSchuyen;
     const baohiem = req.body.baohiem;
     const noiNgoaiTru = req.body.noiNgoaiTru;
     getDataGoogleSheetAip.update(soChuyen,tenBN,gioiTinh,namSinh,tinh,huyen,xa,thonAp,chuanDoan,BVchuyenDen,ngayC,thangC,namC,BSchuyen,baohiem,noiNgoaiTru,rowIndex);
     res.send({"Thongbao":"Cập nhật thành công"});
})

module.exports = router;
