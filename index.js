const express = require('express');
const app = express();
const PORT = 9000;
const dialogflow_fulfillment = require('dialogflow-fulfillment');

// Default response for validation that server is running good and 
// Giving back appropriate response
app.get('/', (req,res)=>{
    res.send("Server is live");
});

// Server listens at given PORT
app.listen(PORT,(err)=>{
    if(err){
        console.log(`Error running the server at ${PORT}`);
    }
    console.log(`Server is live at PORT ${PORT}`);
});
