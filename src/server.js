
const { APP_BASE_HREF } = require('@angular/common');
const express = require('express');
const app  = express();


app.use(express.static(__dirname+'/dist'));


app.listen(process.env.PORT);

app.get('/*', (req , res) => {
    res.sendFile(path.join(__dirname+'/dist/index.html'));
});

console.log('listenning');