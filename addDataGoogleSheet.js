async function addData(sheetTitle,sheetId,soChuyen,hoTen,gioiTinh,namSinh,tinh,huyen,xa,thonAp,benhChuyen,BVchuyenden,ngayC,thangC,namC,BS_C,baohiem,N_NgTru){
    const { GoogleSpreadsheet } = require('google-spreadsheet');
    const fs =  require('fs');

    const RESPONSES_SHEET_ID = sheetId;

    // Create a new document
    const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID);

    // Credentials for the service account
    const CREDENTIALS = JSON.parse(fs.readFileSync('dulieuBV.json'));
    
    /* GET home page. */
    // router.get('/', async function(req, res, next) {

         // const getRow = async () => {
              // use service account creds
              await doc.useServiceAccountAuth({
                   client_email: CREDENTIALS.client_email,
                   private_key: CREDENTIALS.private_key
              });

              // load the documents info
              await doc.loadInfo();

              // Index of the sheet
               //let sheet = doc.sheetsByIndex[sheetID];
              let sheet = doc.sheetsByTitle[sheetTitle];
              let rowsValue = {
                    So_chuyen	               : soChuyen,
                    Ho_ten	               : hoTen,
                    Gioi_tinh                : gioiTinh,
                    Nam_sinh	               : namSinh,
                    Tinh	                    : tinh,
                    Huyen	               : huyen,
                    Xa	                    : xa,
                    ThonAp	               : thonAp,
                    Chuan_Doan	          : benhChuyen,
                    Benh_vien_chuyen_den	: BVchuyenden,
                    Ngay_Chuyen	          : ngayC,
                    Thang_Chuyen	          : thangC,
                    Nam_Chuyen	          : namC,
                    Bac_si_ky                : BS_C,
                    Co_khong_bh              :baohiem,
                    Noi_ngoai_tru            :N_NgTru
              }

              sheet.addRow(rowsValue);
              
              
         // };
    // });	    
}

module.exports.addDataSheet = addData;