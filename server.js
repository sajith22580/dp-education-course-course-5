var express = require("express");
var app = express();
var db = require("./database.js");
var bodyParser = require("body-parser");
const {request, response} = require("express");
app.use(bodyParser.json());

let HTTP_PORT = 5000;

app.listen(HTTP_PORT, () => {
    console.log("Server is running on %PORT%".replace("%PORT%", HTTP_PORT))
});



app.post("/api/customer/", (req, res, next) => {
    try{
        var errors = [];
    
        if(!req.body){
            errors.push("An invalid input");
        }

        
    
        const{
            name,
            address,
            email,
            dateOfBirth,
            gender,
            age,
            cardHolderName,
            cardNumber,
            expiryDate,
            cvv,
            timeStamp
    
    
        } = req.body;

        if(!email){
            errors.push("Email is required");
        }

        if(!cardNumber || cardNumber.toString().length !== 12){
            errors.push("Card number must be 12 digits");
        }

        if(errors.length > 0){
            res.status(400).json({"errors": errors});
            return;
        }

       
    
        var sql = 'INSERT INTO customer (name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expiryDate, cvv, timeStamp) VALUES(?,?,?,?,?,?,?,?,?,?,?)' 
        var params = [name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expiryDate, cvv, timeStamp]
    
        db.run(sql, params, function(err, result){
            if(err){
                res.status(400).json({"error":err.messege})
                return;
            }else {
                res.status(201).json({
                    "messege": "customer " + name + "has registered",
                    //"data":req.body,
                    "CustomerId":this.lastID
                })
            }
        });
    //});
    } catch(E){
        res.status(400).send(E);
    }
    });

app.get("/api/customer/", (req, res, next) => {

    try {
        var sql = "select * from customer"
        var params = []
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.status(201).json({
                "message": "success",
                "data": rows
            })
        });
    } catch (E) {
        res.status(400).send(E);
    }
});


app.put('/api/customer/:customerId', (req, res) => {
    try {
        const customerId = req.params.customerId;
        const {
            name,
            address,
            email,
            dateOfBirth,
            gender,
            age,
            cardHolderName,
            cardNumber,
            expiryDate,
            cvv,
            timeStamp
        } = req.body;
        
        var sql = 'UPDATE customer SET name = ?, address = ?, email = ?, dateOfBirth = ?, gender = ?, age = ?, cardHolderName = ?, cardNumber = ?, expiryDate = ?, cvv = ?, timeStamp = ? WHERE customerId = ?';
        var params = [name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expiryDate, cvv, timeStamp, customerId];
        
        db.run(sql, params, function(err, result) {
            if (err) {
                res.status(400).json({"error": err.message});
            } else {
                res.status(201).json({
                    "message": "Customer " + customerId + " has been updated",
                    "changes": this.changes
                });
            }
        });
    } catch (e) {
        res.status(400).json({"error": e.message});
    }
});


app.delete('/api/customer/:customerId', (req, res) => {
    try {
        const customerId = req.params.customerId;
        
        var sql = 'DELETE FROM customer WHERE customerId = ?';
        var params = [customerId];
        
        db.run(sql, params, function(err, result) {
            if (err) {
                res.status(400).json({"error": err.message});
            } else {
                res.status(201).json({
                    "message": "Customer " + customerId + " has been deleted",
                    "changes": this.changes
                });
            }
        });
    } catch (e) {
        res.status(400).json({"error": e.message});
    }
});


