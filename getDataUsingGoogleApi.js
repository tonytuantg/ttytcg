async function getdata(shTitle){
   const key = require('./dulieuBV.json');
   const { google } = require('googleapis');
   const sheetId = '1NuydN_rCsb9X66qVct9YpowCFSVa4D0f6o8e7obAUMQ';
   const sheets = google.sheets('v4');
   const authClient = new google.auth.JWT(key.client_email, '', key.private_key, 'https://www.googleapis.com/auth/spreadsheets');
   
   const dateString = new Date();
//    const sheetTitle = dateString.getFullYear();
   // const sheetTitle = '2022';
   const response = await sheets.spreadsheets.values.batchGet(
      {
         spreadsheetId: sheetId,
         ranges: [shTitle,shTitle],
         auth : authClient
      //    ranges: ['Sheet1!A2:E','Sheet2!A2:E']
      }
   );

   return response;
}

async function updateRow(soChuyen,tenBN,gioiTinh,namSinh,tinh,huyen,xa,thonAp,chuanDoan,BVchuyenDen,ngayC,thangC,namC,BSchuyen,bh,n_ngTru,rowIndex){
   const key = require('./dulieuBV.json');
   const { google } = require('googleapis');
   const sheetId = '1NuydN_rCsb9X66qVct9YpowCFSVa4D0f6o8e7obAUMQ';
   const sheets = google.sheets('v4');
   const authClient = new google.auth.JWT(key.client_email, '', key.private_key, 'https://www.googleapis.com/auth/spreadsheets');

   const dateString = new Date();
   const sheetTitle = dateString.getFullYear();

   const arrUpdate = [soChuyen,tenBN,gioiTinh,namSinh,tinh,huyen,xa,thonAp,chuanDoan,BVchuyenDen,ngayC,thangC,namC,BSchuyen,bh,n_ngTru];
   const res = await sheets.spreadsheets.values.batchUpdate(
      { 
            spreadsheetId: sheetId,
            // range: ['SoCV!A9:N9'],
            auth : authClient,
            resource: {
                 valueInputOption: "RAW",
                 data: [{
                      range: sheetTitle +"!A" + rowIndex + ":P" + rowIndex,
                      values: [arrUpdate],
                 }],
            },      
      }
   );
}



module.exports.kq = getdata;
module.exports.update = updateRow;
