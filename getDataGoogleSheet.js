async function getData(sheetTitle,sheetId){
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


              // Get all the rows
              let rows = await sheet.getRows();

              // console.log(rows.length);
              return rows;
              
         // };
    // });	    
}


module.exports.getDataSheet = getData;