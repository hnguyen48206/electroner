function dbConnect() {
    console.log('dbconnect in');

    const sql = require('mssql');
    const config = {
        user: 'qlhs',
        password: 'qlhs@124',
        server: '123.20.206.42',
        database: 'QLHS',
        port: '1433',
    };
    sql.connect(config, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        request.query('select * from DM_DONVI', function (err, recordset) {
            if (err) {
                console.log("Something went wrong")
            }
            else {
                //Conver Return Data Object to string
                var result = JSON.stringify(recordset);
                console.log(recordset.recordsets[0]);
            }
        });
    });
}