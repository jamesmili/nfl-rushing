const json = require('json2csv');

// helper to convert json to csv
const downloadResource = (res, fileName, fields, data) => {
    try{
        const json2csv = new json.Parser({ fields });
        const csv = json2csv.parse(data);
        res.header('Content-Type', 'text/csv');
        res.attachment(fileName);
        return res.send(csv);
    }catch (err){
        console.log(err)
    }
}

module.exports = downloadResource;