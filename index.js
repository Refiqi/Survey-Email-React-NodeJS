const express = require('express');
const app = express();


app.get('/', (req, res)=>{
    res.send('Hello');
});








const port = process.env.PORT || 3000;

app.listen(port, (err)=>{
    if (err) throw err;
    console.log(`Server Running at Port: ${port}`);
});