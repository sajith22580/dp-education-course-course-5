var sqlite3 = require('sqlite3').verbose()

const DBSOURSE = "db.sqlite"

let db = new sqlite3.Database(DBSOURSE, (err) => {
    if(err){
        console.error(err.message);
        throw err
    } else {
        console.log('Connected to the SQLite Database');
        db.run(`CREATE TABLE customer (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text,
            address text,
            email text,
            dateOfBirth text,
            gender text,
            age INTEGER,
            cardHolderName text,
            cardNumber INTEGER,
            expiryDate INTEGER,
            cvv INTEGER,
            timeStamp INTEGER
        )`, (err) => {
        if(err){
            //Table already created
        }else {
            //Table just created, creating some rows
            var insert = 'INSERT INTO customer (name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expiryDate, cvv, timeStamp) VALUES(?,?,?,?,?,?,?,?,?,?,?)' 
            db.run(insert, ["A.D.Lakith Dharmasiri", "No 324/A Ra De Mel Road, Colombo", "lakith@gmail.com", "1991.02.25" , "female", 28, "A.D.L.Dharmasiri", 102445217895, "12/2022", 246, "2022-12-31 23:59:59"])
        }
        }

        )
    }
})
module.exports = db