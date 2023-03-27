const express = require('express');
const app = express();
const db = require('./database/database');
const createThoughts = require('./routes/thoughts-routes');
const enableCors = require('./middlewares/cors')

app.use(express.urlencoded({
    extended: true
}))

app.use(enableCors)
app.use(express.json())

app.use('/',createThoughts);


app.use(function(error,req,res,next){
    res.status(500).json({
        message:"Something went wrong"
    })
})


let PORT = 3000 ;

if(process.env.PORT) {
    PORT = process.env.PORT
}
db.runFunc()
.then(()=>{
    app.listen(PORT);
}).catch(function() {
        console.log("Connecting to the database failed")
})